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
            mount._props.Slots[0]._props.filters[0].ExcludedFilter = ["5a2c3a9486f774688b05e574", "5c110624d174af029e69734c", "5a2c3a9486f774688b05e574", "606f2696f2cb2e02a42aceb1"]

            
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
                                filter.ExcludedFilter = ["57486e672459770abd687134", "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a", "5a7c74b3e899ef0014332c29", "5c110624d174af029e69734c", "5a2c3a9486f774688b05e574", "606f2696f2cb2e02a42aceb1"];
                            }
                        })
                    })
                })
            }

            if (this.cfg.backupInDefaultSlot || this.cfg.backupIronsights || this.cfg.backupInTacticalSlot)
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

                            if (this.cfg.backupIronsights)
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