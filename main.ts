player.onChat("set", function (num1, num2, num3) {
    中心位置 = world(num1, num2, num3)
})
function 交錯放置 (外層: number, 材料名稱值: string) {
    Xx = 外層 * -1
    while (Xx <= 外層) {
        if (Math.abs(Xx) % 2 != 0) {
            Yy = 外層 * -1
            while (Yy <= 外層) {
                if (Math.abs(Yy) % 2 != 0) {
                    builder.teleportTo(positions.add(
                    中心位置,
                    pos(Xx, 層數, Yy)
                    ))
                    builder.place(blocks.blockByName(材料名稱值))
                }
                Yy += 1
            }
        }
        Xx += 1
    }
    agent.teleport(中心位置, WEST)
}
player.onChat("Clr", function () {
    層數 = 64
    while (層數 >= 0) {
        blocks.fill(
        AIR,
        positions.add(
        中心位置,
        pos(48, 層數, 48)
        ),
        positions.add(
        中心位置,
        pos(-48, 層數, -48)
        ),
        FillOperation.Replace
        )
        層數 += -1
    }
    blocks.fill(
    VERDANT_FROGLIGHT,
    positions.add(
    中心位置,
    pos(6, 0, 6)
    ),
    positions.add(
    中心位置,
    pos(-6, 0, -6)
    ),
    FillOperation.Replace
    )
    player.say("CLR done")
})
player.onChat("Bu", function () {
    層數 = 3
    for (let index = 0; index < 18; index++) {
        中空層(1, 0, blocks.nameOfBlock(CHISELED_SANDSTONE))
        層數 += 1
    }
    中空層(最大外, 0, blocks.nameOfBlock(CHISELED_SANDSTONE))
    層數 += 1
    中空層(最大外, 8, blocks.nameOfBlock(CHISELED_SANDSTONE))
    層數 += 1
    中空層(最大外, 9, blocks.nameOfBlock(CHISELED_SANDSTONE))
    中空層(最大外 - 1, 8, blocks.nameOfBlock(WATER))
    層數 += 1
    中空層(最大外, 9, blocks.nameOfBlock(CHISELED_RED_SANDSTONE))
    層數 += 1
    for (let index = 0; index < 6; index++) {
        中空層(最大外, 9, blocks.nameOfBlock(CHISELED_SANDSTONE))
        網狀結構(9, true, 0, blocks.nameOfBlock(CHISELED_TUFF))
        層數 += 1
        中空層(最大外, 9, blocks.nameOfBlock(CHISELED_RED_SANDSTONE))
        交錯放置(9, blocks.nameOfBlock(IRON_TRAPDOOR))
        層數 += 1
        中空層(最大外, 9, blocks.nameOfBlock(CHISELED_SANDSTONE))
        網狀結構(9, false, 4, blocks.nameOfBlock(IRON_TRAPDOOR))
        交錯放置(9, blocks.nameOfBlock(AIR))
        層數 += 1
    }
    blocks.fill(
    CHISELED_SANDSTONE,
    positions.add(
    中心位置,
    pos(最大外, 層數, 最大外)
    ),
    positions.add(
    中心位置,
    pos(最大外 * -1, 層數, 最大外 * -1)
    ),
    FillOperation.Replace
    )
    層數 += 1
    blocks.fill(
    SANDSTONE_SLAB,
    positions.add(
    中心位置,
    pos(最大外, 層數, 最大外)
    ),
    positions.add(
    中心位置,
    pos(最大外 * -1, 層數, 最大外 * -1)
    ),
    FillOperation.Replace
    )
    blocks.place(CAMPFIRE, positions.add(
    中心位置,
    pos(0, 3, 0)
    ))
    blocks.place(HOPPER, positions.add(
    中心位置,
    pos(0, 2, 0)
    ))
    blocks.place(TRAPPED_CHEST, positions.add(
    中心位置,
    pos(0, 1, 0)
    ))
})
function 中空層 (外尺寸: number, 內尺寸: number, 材料: string) {
    左上 = positions.add(
    中心位置,
    pos(外尺寸 * 1, 層數, 外尺寸 * 1)
    )
    右下 = positions.add(
    中心位置,
    pos(外尺寸 * -1, 層數, 外尺寸 * -1)
    )
    blocks.fill(
    blocks.blockByName(材料),
    右下,
    左上,
    FillOperation.Replace
    )
    左上 = positions.add(
    中心位置,
    pos(內尺寸 * 1, 層數, 內尺寸 * 1)
    )
    右下 = positions.add(
    中心位置,
    pos(內尺寸 * -1, 層數, 內尺寸 * -1)
    )
    blocks.fill(
    AIR,
    右下,
    左上,
    FillOperation.Replace
    )
}
function 網狀結構 (外層: number, 補洞: boolean, 材料資料值: number, 材料名稱值: string) {
    if (補洞) {
        blocks.fill(
        blocks.blockWithData(IRON_TRAPDOOR, 12),
        positions.add(
        中心位置,
        pos(外層, 層數, 外層 * -1)
        ),
        positions.add(
        中心位置,
        pos(外層 * -1, 層數, 外層)
        ),
        FillOperation.Replace
        )
    }
    跳格 = 外層 * -1
    while (跳格 <= 外層) {
        blocks.fill(
        blocks.blockWithData(blocks.blockByName(材料名稱值), 材料資料值),
        positions.add(
        中心位置,
        pos(跳格, 層數, 外層 * 1)
        ),
        positions.add(
        中心位置,
        pos(跳格, 層數, 外層 * -1)
        ),
        FillOperation.Replace
        )
        跳格 += 2
    }
}
let 跳格 = 0
let 右下: Position = null
let 左上: Position = null
let 層數 = 0
let Yy = 0
let Xx = 0
let 最大外 = 0
let 中心位置: Position = null
中心位置 = positions.add(
player.position(),
posLocal(0, 0, 4)
)
中心位置 = world(200, -60, 200)
最大外 = 10
