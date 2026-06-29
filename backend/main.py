import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="InstaScraper API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    target_username: str
    keyword: str
    login_username: str = ""
    login_password: str = ""
    session_id: str = ""
    resume_cursor: str = ""

@app.post("/api/scrape")
def scrape_posts(req: ScrapeRequest):
    try:
        from instagrapi import Client
        cl = Client()
        
        # Con Instagrapi, simuliamo l'APP iOS/Android e non ci bloccherà
        if req.session_id:
            cl.login_by_sessionid(req.session_id)
        elif req.login_username and req.login_password:
            cl.login(req.login_username, req.login_password)
        else:
            raise HTTPException(status_code=400, detail="Per procedere inserisci o il Session ID o un account")
            
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Errore di accesso all'account o la sessione è scaduta.\nDettaglio: {str(e)}")
        
    try:
        # Usiamo l'API mobile pura (v1) per estrarre l'ID, ignorando la versione pubblica che dà errore 429
        user_info = cl.user_info_by_username_v1(req.target_username)
        user_id = user_info.pk
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Errore! Profilo '{req.target_username}' non trovato o bloccato (429).\nDettaglio: {str(e)}")
        
    results = []
    
    try:
        # Preleviamo fino a "amount" post per ciclo, estraendo anche il 'cursor' 
        # per permettere di riprendere da dove ci eravamo fermati.
        amount_to_fetch = 1000
        fetched = 0
        max_id = req.resume_cursor
        
        while fetched < amount_to_fetch:
            # Effettuiamo la chiamata manuale all'endpoint V1 del feed per evitare i problemi di wrapper mancanti
            params = {"max_id": max_id} if max_id else {}
            chunk_data = cl.private_request(f"feed/user/{user_id}/", params=params)
            
            items = chunk_data.get('items', [])
            if not items:
                break
                
            for item in items:
                caption_dict = item.get('caption')
                caption = None
                if caption_dict and isinstance(caption_dict, dict):
                    caption = caption_dict.get('text')
                    
                if caption:
                    lines = caption.strip().split('\n')
                    for line in lines:
                        if req.keyword.lower() in line.lower():
                            results.append(line.strip())
                            break
                            
            fetched += len(items)
            max_id = chunk_data.get('next_max_id', '')
            
            if not max_id:
                break
                
    except Exception as e:
        import traceback
        if len(results) == 0 and fetched == 0:
            raise HTTPException(status_code=500, detail=f"Si è bloccato prima di estrarre i post. Dettaglio: {str(e)}\n\n{traceback.format_exc()}")
        pass
        
    return {"results": results, "next_cursor": max_id if 'max_id' in locals() and max_id else None}
