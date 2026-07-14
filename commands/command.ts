abstract class Command {
    name: String
    category: String
    aliases: String[]
    setAliases: (...args: String[]) => void
    abstract runs(): void

    constructor(category: String, name: String) {
            this.name = name
            this.category = category
            this.aliases = []

            this.setAliases = (...args: String[]) => {
                args.forEach(alias => {
                    this.aliases.push(alias)
                })
            }


    }
}