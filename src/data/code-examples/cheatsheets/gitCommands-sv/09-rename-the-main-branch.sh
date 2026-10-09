# Byt namn på den lokala branchen (t.ex. master -> main)
git branch -m master main

# Push:a den nya branchen och sätt den som upstream
git push -u origin main

# Ta bort den gamla branchen på remoten
git push origin --delete master
