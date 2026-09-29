public class MemoryDemo {

    public static void main(String[] args) {
        int score = 10;
        Player hero = new Player("Nova", 100);
        levelUp(hero, score);
        System.out.println(hero.getHealth());
    }

    static void levelUp(Player player, int bonus) {
        int newHealth = player.getHealth() + bonus;
        player.setHealth(newHealth);
    }
}

class Player {
    private String name;
    private int health;

    Player(String name, int health) {
        this.name = name;
        this.health = health;
    }

    int getHealth() {
        return health;
    }

    void setHealth(int health) {
        this.health = health;
    }
}
