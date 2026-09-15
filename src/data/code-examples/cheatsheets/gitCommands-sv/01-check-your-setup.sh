# Bekräfta att Git är installerat
git --version

# Lista alla inställningar (system, global och lokal kombinerat)
git config --list

# Lista bara dina globala (användarnivå) inställningar - de du kollar oftast
git config --list --global

# Lista inställningar för nuvarande repository (måste köras inuti ett repo)
git config --list --local

# Lista systemomfattande inställningar (ovanligt - delas av alla användare på maskinen)
git config --list --system
