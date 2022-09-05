import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
// @FUTURE ME:  PLEASE REWRITE THIS, THIS IS A MESS
class Mod implements IPostDBLoadMod
{
    private cfg = require("../config.json");
    private items = require("../items.json");

    postDBLoad(container: DependencyContainer): void
    {
        if (this.cfg.enabled)
        {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
            const itemsdb = databaseServer.getTables().templates.items;
            const mount = itemsdb["5649a2464bdc2d91118b45a8"];
            const filters = [];

            /*
            @FUTURE ME: these are at least partly bugged items enable at your own risk

            const assaultScopes = ["55818add4bdc2d5b648b456f", "5c1cdd302e221602b3137250", "59db7eed86f77461f8380365", "5b3b6dc75acfc47a8773fb1e", "5c07dd120db834001c39092d", "5c0a2cec0db834001b7ce47d"];
            const optics = ["5dff77c759400025ea5150cf", "57c69dd424597774c03b7bbc", "5b3b99265acfc4704b4a1afb", "6171407e50224f204c1da3c5", "5a37ca54c4a282000d72296a", "618b9643526131765025ab35", "5b2389515acfc4771e1be0c0", "618bab21526131765025ab3f", "61713cc4d8e3106d9806c109", "5c86592b2e2216000e69e77c", "5aa66a9be5b5b0214e506e89", "5aa66c72e5b5b00016327c93", "62811f461d5df4475f46a332"];
            const specialSights = ["5d1b5e94d7ad1a2b865a96b0", "55818aeb4bdc2ddc698b456a", "609bab8b455afd752b2e6138", "5a1ead28fcdbcb001912fa9f"];

            const debugClasses = [assaultScopes, optics, specialSights];
            for (const l of debugClasses)
            {
                for (const id of l)
                {
                    filters.push(id);
                }
            }
            */

            if (this.cfg.riser)
            {
                filters.push("5c064c400db834001d23f468");
            }
            for (const i of Object.keys(this.items))
            {
                this.items[i].forEach(id =>
                {
                    if (this.cfg.types[i])
                    {
                        filters.push(id);
                    }
                });
            }
            mount._props.Slots[0]._props.filters[0].Filter = filters;
            mount._props.Slots[0]._props.filters[0].ExcludedFilter = ["57235b6f24597759bf5a30f1", "5c066e3a0db834001b7353f0", "5c0558060db834001b735271", "5c0696830db834001d23f5da", "5c110624d174af029e69734c", "606f2696f2cb2e02a42aceb1"]

            
            /*
            const ironSights = ["55d4af3a4bdc2d972f8b456f", "55d5f46a4bdc2d1b198b4567", "61817865d3a39d50044c13a4", "5bb20e49d4351e3bac1212de", "5ba26b01d4351e0085325a51", "5ba26b17d4351e00367f9bdd", "5c17804b2e2216152006c02f", "5c1780312e221602b66cc189", "5dfa3d950dee1b22f862eae0", "5dfa3d7ac41b2312ea33362a", "5fb6567747ce63734e3fa1dc", "5fb6564947ce63734e3fa1da", "5fc0fa362770a0045c59c677", "5fc0fa957283c4046c58147e", "5894a73486f77426d259076c", "5894a81786f77427140b8347", "5bc09a30d4351e00367fb7c8", "5bc09a18d4351e003562b68e", "5c18b90d2e2216152142466b", "5c18b9192e2216398b5a8104"];
            ironSights.forEach((id) => 
            {
                mount._props.Slots[0]._props.filters[0].Filter.push(id);
            })

            Iron sights are not working properly and until I figure that out how they really work this will sadly be unimplemented!
            */
            if (this.cfg.sightsInMountSlot)
            {
                const mods = Object.values(itemsdb).filter((item) => item._props.Slots);
                mods.forEach((mod) =>
                {
                    mod._props.Slots.forEach((slot) =>
                    {
                        slot._props.filters.forEach((filter) =>
                        {
                            if (filter.Filter.includes("5649a2464bdc2d91118b45a8"))
                            {
                                filter.Filter.push("55818add4bdc2d5b648b456f");
                                filter.Filter.push("55818ad54bdc2ddc698b4569");
                                filter.Filter.push("5b5f742686f774093e6cb4ff");
                                filter.Filter.push("55818acf4bdc2dde698b456b");
                                filter.Filter.push("55818aeb4bdc2ddc698b456a");
                                [
                                    "57ac965c24597706be5f975c",
                                    "57aca93d2459771f2c7e26db",
                                    "544a3a774bdc2d3a388b4567",
                                    "5d2dc3e548f035404a1a4798",
                                    "57adff4f24597737f373b6e6",
                                    "5c0517910db83400232ffee5",
                                    "591c4efa86f7741030027726",
                                    "570fd79bd2720bc7458b4583",
                                    "570fd6c2d2720bc6458b457f",
                                    "558022b54bdc2dac148b458d",
                                    "5c07dd120db834001c39092d",
                                    "5c0a2cec0db834001b7ce47d",
                                    "58491f3324597764bc48fa02",
                                    "584924ec24597768f12ae244",
                                    "5b30b0dc5acfc400153b7124",
                                    "6165ac8c290d254f5e6b2f6c",
                                    "60a23797a37c940de7062d02",
                                    "5d2da1e948f035477b1ce2ba",
                                    "5c0505e00db834001b735073",
                                    "609a63b6e2ff132951242d09",
                                    "584984812459776a704a82a6",
                                    "59f9d81586f7744c7506ee62",
                                    "570fd721d2720bc5458b4596",
                                    "57ae0171245977343c27bfcf",
                                    "5dfe6104585a0c3e995c7b82",
                                    "544a3d0a4bdc2d1b388b4567",
                                    "5d1b5e94d7ad1a2b865a96b0",
                                    "609bab8b455afd752b2e6138",
                                    "58d39d3d86f77445bb794ae7",
                                    "616554fe50224f204c1da2aa",
                                    "5c7d55f52e221644f31bff6a",
                                    "616584766ef05c2ce828ef57",
                                    "5b3b6dc75acfc47a8773fb1e",
                                    "615d8d878004cc50514c3233",
                                    "5b2389515acfc4771e1be0c0",
                                    "577d128124597739d65d0e56",
                                    "618b9643526131765025ab35",
                                    "618bab21526131765025ab3f",
                                    "5c86592b2e2216000e69e77c",
                                    "5a37ca54c4a282000d72296a",
                                    "5d0a29fed7ad1a002769ad08",
                                    "5c064c400db834001d23f468",
                                    "58d2664f86f7747fec5834f6",
                                    "57c69dd424597774c03b7bbc",
                                    "5b3b99265acfc4704b4a1afb",
                                    "5aa66a9be5b5b0214e506e89",
                                    "5aa66c72e5b5b00016327c93",
                                    "5c1cdd302e221602b3137250",
                                    "61714b2467085e45ef140b2c",
                                    "6171407e50224f204c1da3c5",
                                    "61713cc4d8e3106d9806c109",
                                    "5b31163c5acfc400153b71cb",
                                    "5a33b652c4a28232996e407c",
                                    "5a33b2c9c4a282000c5a9511",
                                    "59db7eed86f77461f8380365",
                                    "5a1ead28fcdbcb001912fa9f",
                                    "5dff77c759400025ea5150cf",
                                    "626bb8532c923541184624b4",
                                    "62811f461d5df4475f46a332"
                                ].forEach((id) =>
                                {
                                    filter.Filter.push(id);
                                })
                                filter.ExcludedFilter = ["57486e672459770abd687134", "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a", "5a7c74b3e899ef0014332c29", "5c110624d174af029e69734c", "57235b6f24597759bf5a30f1", "5c066e3a0db834001b7353f0", "5c0558060db834001b735271", "5c0696830db834001d23f5da", "606f2696f2cb2e02a42aceb1"];
                            }
                        })
                    })
                })
            }

            if (this.cfg.backupInDefaultSlot || this.cfg.backupInIronsightsSlot || this.cfg.backupInTacticalSlot)
            {
                const mods = Object.values(itemsdb).filter((item) => item._props.Slots);
                mods.forEach((mod) =>
                {
                    mod._props.Slots.forEach((slot) =>
                    {
                        slot._props.filters.forEach((filter) =>
                        {
                            if (this.cfg.backupInDefaultSlot)
                            {
                                if ((filter.Filter.includes("57ae0171245977343c27bfcf") || filter.Filter.includes("5b5f742686f774093e6cb4ff")) && mod._id != "5649a2464bdc2d91118b45a8")
                                {
                                    filter.Filter.push("5649a2464bdc2d91118b45a8");
                                }
                            }

                            if (this.cfg.backupInIronsightsSlot)
                            {
                                if ((filter.Filter.includes("5bc09a30d4351e00367fb7c8") || filter.Filter.includes("5bc09a18d4351e003562b68e")) && mod._id != "5649a2464bdc2d91118b45a8")
                                {
                                    filter.Filter.push("5649a2464bdc2d91118b45a8");
                                }
                            }

                            if (this.cfg.backupInTacticalSlot)
                            {
                                if ((filter.Filter.includes("56def37dd2720bec348b456a")) && mod._id != "5649a2464bdc2d91118b45a8")
                                {
                                    filter.Filter.push("5649a2464bdc2d91118b45a8");
                                }
                            }
                        })
                    })
                })
            }
        }
    }
}

module.exports = { mod: new Mod() }