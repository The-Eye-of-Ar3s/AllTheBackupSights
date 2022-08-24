import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class Mod implements IPostDBLoadMod
{
    private cfg = require("../config.json");

    postDBLoad(container: DependencyContainer): void
    {
        if (this.cfg.enabled)
        {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
            const itemsdb = databaseServer.getTables().templates.items;
            const mount = itemsdb["5649a2464bdc2d91118b45a8"];
            const items = {
                "assaultScopes": "55818add4bdc2d5b648b456f",
                "collimators": "55818ad54bdc2ddc698b4569",
                "compactCollimators": "5b5f742686f774093e6cb4ff",
                "ironSights": "55818ac54bdc2d5b648b456e",
                "optics": "55818ae44bdc2dde698b456c",
                "specialSights": "55818aeb4bdc2ddc698b456a"
            };
            const types = ["assaultScopes", "collimators", "compactCollimators", "ironSights", "optics", "specialSights"];
            const filters = [];
            for (let i = 0; i<5; i++)
            {
                if (this.cfg[types[i]])
                {
                    filters.push(items[types[i]]);
                }
            }
            mount._props.Slots[0]._props.filters[0].Filter = filters;
            if (this.cfg.excludeDovetail)
            {
                mount._props.Slots[0]._props.filters[0].ExcludedFilter = ["57486e672459770abd687134", "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a"]
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
                                filter.ExcludedFilter = ["57486e672459770abd687134", "5947db3f86f77447880cf76f", "6113d6c3290d254f5e6b27db", "618a5d5852ecee1505530b2a", "5a7c74b3e899ef0014332c29", "5d21f59b6dbe99052b54ef83", "5a2c3a9486f774688b05e574", "606f2696f2cb2e02a42aceb1"];
                            }
                        })
                    })
                })
            }
        }
    }
}

module.exports = { mod: new Mod() }