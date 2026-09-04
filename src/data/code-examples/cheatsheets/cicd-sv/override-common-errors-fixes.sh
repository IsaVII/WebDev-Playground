Fel: "Process completed with exit code 1" (ingen mer detalj)
Orsak: Ett steg misslyckades men det verkliga felet ligger dolt ovanför den generiska sammanfattningsraden.
Fix: Expandera loggen för det misslyckade steget, inte bara den sista sammanfattningsblocket - den faktiska stacktracen finns vanligtvis några rader upp.

Fel: "Dependencies lock file is not found" / npm ci misslyckas
Orsak: Ingen package-lock.json är committad, eller så kan setup-nodes cache: "npm" inte hitta någon att hasha.
Fix: Committa package-lock.json - npm ci vägrar köra utan en exakt lockfil, med avsikt.

Fel: Workflowen triggas inte alls
Orsak: Filen ligger inte under .github/workflows/, har ett YAML-syntaxfel, eller så matchar branchnamnet i on.push.branches inte din standardbranch.
Fix: Kontrollera "All workflows"-listan i Actions-fliken - om din inte finns med kunde GitHub inte parsa filen; kontrollera YAML-indenteringen först.

Fel: "remote: Permission to <owner>/<repo>.git denied" / 403 vid push till gh-pages
Orsak: Deploy-jobbet saknar permissions: contents: write, så standard-GITHUB_TOKEN får inte pusha den gh-pages-branch som peaceiris/actions-gh-pages skapar.
Fix: Lägg till permissions: contents: write i deploy-jobbet, som visas i steg 9.

Fel: "Resource not accessible by integration" vid deploy (endast om du använder det valfria actions/deploy-pages-jobbet)
Orsak: Jobbet saknar permissions-blocket (pages: write / id-token: write) som actions/deploy-pages behöver, eller så är repots Pages-källa fortfarande satt till "Deploy from a branch" istället för "GitHub Actions".
Fix: Lägg till det permissions-blocket i deploy-jobbet, och byt Pages-källa till "GitHub Actions" - se det valfria understeget under steg 9.

Fel: En secret visas som en tom sträng i loggen
Orsak: Referens till secrets.NAME från en pull_request-triggad workflow på en fork, där secrets medvetet hålls tillbaka.
Fix: Använd pull_request_target med försiktighet, eller strukturera om så att steget som behöver secreten bara körs vid push till ditt eget repo.
