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
            if (this.cfg.excludeDovetail)
            {
                if (!mount._props.Slots[0]._props.filters[0].ExcludedFilter)
                {
                    mount._props.Slots[0]._props.filters[0].ExcludedFilter = ["57486e672459770abd687134","5a7c74b3e899ef0014332c29" , "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a"];
                }
                else
                {
                    ["57486e672459770abd687134", "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a"].forEach((id) => 
                    {
                        mount._props.Slots[0]._props.filters[0].ExcludedFilter.push(id);
                    })
                }
            }
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

            if (this.cfg.backupInDefaultSlot)
            {
                const mods = Object.values(itemsdb).filter((item) => item._props.Slots);
                mods.forEach((mod) =>
                {
                    mod._props.Slots.forEach((slot) =>
                    {
                        slot._props.filters.forEach((filter) =>
                        {
                            if ((filter.Filter.includes("57ae0171245977343c27bfcf") || filter.Filter.includes("5b5f742686f774093e6cb4ff")) && mod._id != "5649a2464bdc2d91118b45a8")
                            {
                                filter.Filter.push("5649a2464bdc2d91118b45a8");
                            }
                        })
                    })
                })
            }
        }
    }
}

module.exports = { mod: new Mod() }