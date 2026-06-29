import sys
import instaloader

SESSION_ID = sys.argv[1] if len(sys.argv) > 1 else ""

L = instaloader.Instaloader()
if SESSION_ID:
    L.context._session.cookies.set('sessionid', SESSION_ID, domain='.instagram.com')
    L.context._session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    print("Fetching profile fedefrusciante...")
    profile = instaloader.Profile.from_username(L.context, 'fedefrusciante')
    print("Profile found. Getting posts...")
    posts = profile.get_posts()
    count = 0
    for post in posts:
        print("Post found:", post.caption[:20] if post.caption else "NO CAPTION")
        count += 1
        if count >= 3:
            break
except Exception as e:
    import traceback
    print("EXCEPTION OCCURRED:", e)
    traceback.print_exc()
