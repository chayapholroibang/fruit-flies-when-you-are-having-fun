namespace SpriteKind {
    export const Brick = SpriteKind.create()
    export const Checker = SpriteKind.create()
    export const BounceChecker = SpriteKind.create()
    export const VisualFloof = SpriteKind.create()
}
/**
 * brick breaking game TODO list
 * 
 * [x] aiming
 * 
 * [x] firing balls
 * 
 * [x] brick spawning
 * 
 * [x] BUG: ghost bricks
 * 
 * [x] bricks breaking
 * 
 * [x] bricks w/ numbers
 * 
 * [ ] salvo count
 * 
 * [ ] brick placement
 * 
 * [ ] bricks moving
 * 
 * [ ] integrate art
 * 
 * [ ] progression mechanics
 * 
 * bricks: 8x8, balls: 2x2
 * 
 * tallest brick: 24
 */
// 1. place brick randomly
// 
// 2. delete if overlapping
// 
// 3. sliding window to flip wall on
sprites.onDestroyed(SpriteKind.Brick, function (sprite) {
    sprites.readDataSprite(sprite, "txt").destroy()
})
function fireSalvo () {
    if (!(isFiring) && numSalvos > 0) {
        numSalvos += -1
        updateHUD()
        isFiring = true
        timer.background(function () {
            for (let index = 0; index < ballsPerSalvo; index++) {
                ball = sprites.createProjectileFromSprite(img`
                    1 1 
                    1 1 
                    `, cannon, (cursor.x - cannon.x) * ballSpeed, (cursor.y - cannon.y) * ballSpeed)
                ball.setFlag(SpriteFlag.BounceOnWall, true)
                ball.setFlag(SpriteFlag.DestroyOnWall, false)
                pause(200)
            }
            isFiring = false
        })
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function clearTracer () {
    scene.setBackgroundImage(img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `)
    if (tracer) {
        tracer.destroy()
    }
}
function updateHUD () {
    if (!(hdrRound)) {
        hdrRound = textsprite.create("ROUND", 0, 5)
        hdrRound.top = 2
        hdrRound.left = 114
    }
    if (!(smallRoundTxt)) {
        smallRoundTxt = textsprite.create("#")
        smallRoundTxt.top = hdrRound.bottom + 2
        smallRoundTxt.left = 114
    }
    if (!(hdrSalvo)) {
        hdrSalvo = textsprite.create("SALVOS", 0, 5)
        hdrSalvo.top = smallRoundTxt.bottom + 2
        hdrSalvo.left = 114
    }
    if (!(countSalvo)) {
        countSalvo = textsprite.create("#")
        countSalvo.top = hdrSalvo.bottom + 2
        countSalvo.left = 114
    }
    if (!(hdrBalls)) {
        hdrBalls = textsprite.create("BALLS", 0, 5)
        hdrBalls.left = 114
        hdrBalls.top = countSalvo.bottom + 2
    }
    if (!(countBalls)) {
        countBalls = textsprite.create("#")
        countBalls.left = 114
        countBalls.top = hdrBalls.bottom + 2
    }
    if (!(hdrTrace) && hasTracer) {
        hdrTrace = textsprite.create("Press B", 0, 9)
        hdrTrace.left = 114
        hdrTrace.top = countBalls.bottom + 10
        hdrTrace2 = textsprite.create("to", 0, 9)
        hdrTrace2.left = 114
        hdrTrace2.top = hdrTrace.bottom + 2
        hdrTrace3 = textsprite.create("trace!", 0, 9)
        hdrTrace3.left = 114
        hdrTrace3.top = hdrTrace2.bottom + 2
    }
    if (hasBarriers && !(hdrBarrier)) {
        hdrBarrier = textsprite.create("WALLS", 0, 5)
        hdrBarrier.left = 114
        hdrBarrier.top = countBalls.bottom + 2
        countBarriers = textsprite.create("#")
        countBarriers.left = 114
        countBarriers.top = hdrBarrier.bottom + 2
        hdrTrace.destroy()
        hdrTrace2.destroy()
        hdrTrace3.destroy()
        hdrTrace = textsprite.create("Press", 0, 9)
        hdrTrace.left = 114
        hdrTrace.top = countBarriers.bottom + 10
        hdrTrace2 = textsprite.create("DOWN for", 0, 9)
        hdrTrace2.left = 114
        hdrTrace2.top = hdrTrace.bottom + 2
        hdrTrace3 = textsprite.create("a wall!", 0, 9)
        hdrTrace3.left = 114
        hdrTrace3.top = hdrTrace2.bottom + 2
    }
    countBalls.setText("" + numSalvos * ballsPerSalvo)
    countSalvo.setText("" + numSalvos + "/5")
    smallRoundTxt.setText("" + round)
    if (hasBarriers) {
        countBarriers.setText("" + numBarriers)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hasTracer && !(isBallsActive) && !(isBarrierActive)) {
        clearTracer()
        tracer = fireTo(cannon, ballSpeed, img`
            1 1 
            1 1 
            `, cursor)
        tracer.setFlag(SpriteFlag.BounceOnWall, true)
        tracer.setFlag(SpriteFlag.DestroyOnWall, false)
        tracerPrevX = cannon.x
        tracerPrevY = cannon.y
    }
})
function toggleWallsForBrick (brick: Sprite, wallOn: boolean) {
    collisionChecker = sprites.create(img`
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        `, SpriteKind.Checker)
    for (let loc of tiles.getTilesByType(assets.tile`transparency8`)) {
        tiles.placeOnTile(collisionChecker, loc)
        if (brick.overlapsWith(collisionChecker)) {
            tiles.setWallAt(loc, wallOn)
        }
    }
    for (let loc of tiles.getTilesByType(assets.tile`tile7`)) {
        tiles.placeOnTile(collisionChecker, loc)
        if (brick.overlapsWith(collisionChecker)) {
            tiles.setWallAt(loc, wallOn)
            tiles.setTileAt(loc, assets.tile`tile2`)
        }
    }
    collisionChecker.destroy()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    clearTracer()
    fireSalvo()
})
function createBricks () {
    for (let index2 = 0; index2 <= brickMaxNum; index2++) {
        vis = brickVisuals[randint(0, brickVisuals.length - 1)]
        brick = sprites.create(vis, SpriteKind.Brick)
        tiles.placeOnRandomTile(brick, assets.tile`transparency8`)
        brick.left = tiles.locationXY(tiles.locationOfSprite(brick), tiles.XY.left)
        brick.right = Math.constrain(brick.right, 0, 112)
        brick.top = tiles.locationXY(tiles.locationOfSprite(brick), tiles.XY.top)
        brick.bottom = Math.constrain(brick.bottom, 0, 80)
        sprites.setDataNumber(brick, "hp", randint(brickMinHealth, brickMaxHealth))
        setBrickNum(brick)
        for (let value of sprites.allOfKind(SpriteKind.Brick)) {
            if (brick.overlapsWith(value)) {
                brick.destroy()
            }
        }
    }
    bricks = sprites.allOfKind(SpriteKind.Brick)
    for (let value2 of bricks) {
        toggleWallsForBrick(value2, true)
    }
}
info.onCountdownEnd(function () {
	
})
sprites.onOverlap(SpriteKind.BounceChecker, SpriteKind.Brick, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.Invisible, false)
    animation.runImageAnimation(
    sprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 8 . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . 8 8 . . . 
        . . 8 . . 8 . . 
        . . 8 . . 8 . . 
        . . . 8 8 . . . 
        . . . . . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        . . . 8 8 . . . 
        . . 8 . . 8 . . 
        . 8 . . . . 8 . 
        . 8 . . . . 8 . 
        . . 8 . . 8 . . 
        . . . 8 8 . . . 
        . . . . . . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 . . 8 . . 
        . 8 . . . . 8 . 
        8 . . . . . . 8 
        8 . . . . . . 8 
        . 8 . . . . 8 . 
        . . 8 . . 8 . . 
        . . . 8 8 . . . 
        `],
    50,
    false
    )
    sprite.setKind(SpriteKind.VisualFloof)
    sprites.changeDataNumberBy(otherSprite, "hp", -1)
    if (sprites.readDataNumber(otherSprite, "hp") == 0) {
        toggleWallsForBrick(otherSprite, false)
        otherSprite.destroy()
        updateHUD()
    } else {
        setBrickNum(otherSprite)
    }
})
function createBarrier () {
    if (!(isBarrierActive) && !(isTracerActive) && 0 < numBarriers) {
        numBarriers += -1
        for (let index = 0; index <= 11; index++) {
            loc = tiles.getTileLocation(index + 2, 14)
            tiles.setTileAt(loc, assets.tile`tile7`)
            tiles.setWallAt(loc, true)
            barrier = sprites.create(img`
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                `, SpriteKind.Brick)
            barrier.left = 16
            barrier.bottom = 120
            barrier.setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(barrier, "hp", brickMaxHealth)
            setBrickNum(barrier)
        }
    }
}
function announceRound () {
    anounceText("ROUND" + round, 24)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    createBarrier()
})
function setBrickNum (brick: Sprite) {
    brickTxt = sprites.readDataSprite(brick, "txt")
    if (brickTxt) {
        brickTxt.destroy()
    }
    textSprite = textsprite.create("" + sprites.readDataNumber(brick, "hp"), 0, 1)
    textSprite.setOutline(1, 15)
    textSprite.x = brick.x
    textSprite.y = brick.y
    sprites.setDataSprite(brick, "txt", textSprite)
}
function nextRound () {
    clearTracer()
    round += 1
    if (round == 10) {
        hasTracer = true
        effects.confetti.startScreenEffect(2000)
        anounceText("NEW POWER!", 16)
        anounceText("Press \"B\" to trace!", 8)
    }
    if (round == 20) {
        hasBarriers = true
        effects.confetti.startScreenEffect(2000)
        anounceText("NEW POWER!", 16)
        anounceText("Press DOWN for a wall!", 8)
    }
    announceRound()
    brickMaxNum += 1
    brickMinHealth += 1
    brickMaxHealth = Math.round(brickMaxHealth * 1.2)
    ballsPerSalvo += 1
    numSalvos = 5
    if (hasBarriers) {
        numBarriers += 1
    }
    updateHUD()
    createBricks()
}
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`tile4`, function (sprite, location) {
    sprite.destroy()
})
function anounceText (message: string, fontSize: number) {
    story.queueStoryPart(function () {
        roundTxt = textsprite.create(message, 0, 5)
        roundTxt.setOutline(2, 6)
        roundTxt.setMaxFontHeight(fontSize)
        roundTxt.right = 0
        roundTxt.y = scene.screenHeight() / 2
        story.spriteMoveToLocation(roundTxt, scene.screenWidth() / 2, roundTxt.y, 200)
    })
    story.queueStoryPart(function () {
        pause(1000)
        roundTxt.vx = 200
        pause(1000)
        roundTxt.destroy()
    })
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (sprite != tracer) {
        sprite.startEffect(effects.trail, 100)
        collisionChecker = sprites.create(img`
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 
            `, SpriteKind.BounceChecker)
        collisionChecker.lifespan = 250
        tiles.placeOnTile(collisionChecker, location)
        collisionChecker.setFlag(SpriteFlag.Invisible, true)
    }
})
function fireTo (source: Sprite, speed: number, img2: Image, target: Sprite) {
    return sprites.createProjectileFromSprite(img2, source, (target.x - source.x) * speed, (target.y - source.y) * speed)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Brick, function (sprite, otherSprite) {
	
})
let roundTxt: TextSprite = null
let textSprite: TextSprite = null
let brickTxt: Sprite = null
let barrier: Sprite = null
let loc: tiles.Location = null
let isTracerActive = false
let bricks: Sprite[] = []
let brick: Sprite = null
let vis: Image = null
let collisionChecker: Sprite = null
let tracerPrevY = 0
let tracerPrevX = 0
let isBarrierActive = false
let isBallsActive = false
let countBarriers: TextSprite = null
let hdrBarrier: TextSprite = null
let hdrTrace3: TextSprite = null
let hdrTrace2: TextSprite = null
let hdrTrace: TextSprite = null
let countBalls: TextSprite = null
let hdrBalls: TextSprite = null
let countSalvo: TextSprite = null
let hdrSalvo: TextSprite = null
let smallRoundTxt: TextSprite = null
let hdrRound: TextSprite = null
let tracer: Sprite = null
let ball: Sprite = null
let isFiring = false
let hasTracer = false
let hasBarriers = false
let round = 0
let numBarriers = 0
let brickMaxHealth = 0
let brickMinHealth = 0
let brickMaxNum = 0
let ballsPerSalvo = 0
let numSalvos = 0
let brickVisuals: Image[] = []
let ballSpeed = 0
let cursor: Sprite = null
let cannon: Sprite = null
cannon = sprites.create(img`
    a a a a a a 
    a a a a a a 
    a a a a a a 
    a a a a a a 
    a a a a a a 
    a a a a a a 
    `, SpriteKind.Player)
cursor = sprites.create(img`
    a a 
    a a 
    `, SpriteKind.Player)
let cursor2 = sprites.create(img`
    a a a 
    a a a 
    a a a 
    `, SpriteKind.Player)
let cursorAngle = 3.14159
cannon.setPosition(64, 110)
tiles.setSmallTilemap(tilemap`level1`)
scene.setBackgroundColor(15)
ballSpeed = 10
brickVisuals = [
img`
    . . . . 5 4 5 . . . . . . . . . 
    . . . . 4 5 5 . . . . . . . . . 
    . . . 5 5 5 4 5 . . . . . . . . 
    . . . 5 4 5 5 5 . . . . . . . . 
    . . . 4 5 5 5 5 . . . . . . . . 
    . . . 5 5 5 4 5 . . . . . . . . 
    . . . 5 4 5 5 5 . . . . . . . . 
    . . . 4 5 5 4 5 . . . . . . . . 
    . . . 5 5 5 5 4 . . . . . . . . 
    . . . 5 4 5 5 5 . . . . . . . . 
    . . . 4 5 5 4 5 . . . . . . . . 
    . . . 5 4 5 5 4 7 7 7 7 7 . . . 
    7 7 7 e 5 5 e e 7 6 6 6 7 7 7 . 
    7 6 7 7 4 e 4 7 6 6 6 6 6 6 7 7 
    . . 6 6 7 7 7 6 6 6 . . . . 6 7 
    . . . 6 6 6 6 6 . . . . . 7 7 . 
    `,
img`
    .8676.7667...77676.6668.
    886666.66666666666666668
    866666667666676666667668
    866666666768666668676668
    886676686668666666866688
    886667668666876668688888
    888868787668778758888888
    .8888887776876558888888.
    ........77777775........
    .........7777776........
    .........777575.........
    ........6677575.........
    .........677575.........
    .........777575.........
    .........777575.........
    ........77775755........
    `,
img`
    ..........77.7..........
    .e222222266777622222222.
    e22422222226662224222222
    e22222422222222222224242
    e22242222224224222222222
    e24222224222222242242242
    ee222242224222222222222e
    .eeeeeeee2222422eeeeeee.
    ........e2222222........
    ........e2242242........
    ........e2222222........
    ........e2424222........
    ........e2222222........
    ........ee22242e........
    .........ee222e.........
    ..........eeee..........
    `,
img`
    . . 6 6 7 7 7 6 6 7 7 6 6 7 . . 
    . 6 6 7 7 7 6 6 6 7 7 7 6 6 7 . 
    6 6 7 7 7 6 6 6 7 7 7 7 7 6 7 7 
    6 6 7 7 7 6 6 7 7 7 7 7 6 6 7 7 
    5 6 6 7 7 7 6 6 7 7 7 7 6 6 7 7 
    5 6 6 6 7 7 7 6 7 7 7 6 6 7 7 7 
    1 5 5 6 6 7 7 6 6 7 7 6 6 7 7 7 
    1 5 5 6 6 7 7 6 6 7 7 7 6 6 7 7 
    1 5 6 6 7 7 7 6 6 7 7 7 7 6 6 7 
    1 5 6 6 7 7 6 6 7 7 7 7 7 6 6 7 
    5 6 6 6 7 7 6 6 6 7 7 7 7 6 6 7 
    5 6 6 7 7 7 7 7 6 7 7 7 6 6 7 7 
    6 6 7 7 7 7 7 7 6 7 7 6 6 7 7 7 
    6 6 6 7 7 7 7 6 6 7 7 6 6 7 7 7 
    . 6 6 6 7 7 7 6 6 7 7 6 6 7 7 . 
    . . 6 6 7 7 7 6 6 7 7 7 6 6 . . 
    `,
img`
    . . 6 6 . 6 6 . 
    a a 8 6 6 a 3 1 
    a a 6 8 6 a a 3 
    a a a 3 8 6 a a 
    . 8 a a a 8 8 . 
    8 8 a a a a 3 1 
    8 a a 3 a a a 3 
    a a a a 8 a a a 
    8 a a a 8 8 8 8 
    8 8 8 8 a a 8 8 
    8 8 a 8 a 3 1 8 
    . 8 8 8 a a 3 8 
    8 a a 8 a a a a 
    8 8 a 8 8 8 8 a 
    8 8 8 8 8 8 8 8 
    . 8 8 8 8 8 8 . 
    `,
img`
    . . . . . 7 7 6 6 7 7 . . . . . 
    . . c c c c 6 6 6 6 c c c c . . 
    . c c c c c c c c c c c c c c . 
    c c b b b c c c c c c c b b b b 
    b b b b b b b b b b b b b b b b 
    d d d b b b b b b b b b d d d d 
    d d 1 d d b b b b b b d 1 1 d d 
    d 1 1 1 1 d d d d d d 1 1 1 1 d 
    d 1 d d 1 1 1 1 1 1 1 1 1 d d d 
    d 1 1 1 1 1 1 d d d d d 1 1 1 d 
    . d 1 d d d 1 1 1 1 1 1 1 1 1 d 
    . d d 1 1 1 d d d d 1 1 1 d d . 
    . . . d d 1 1 1 1 1 1 d d . . . 
    . . . . . d d d d d d . . . . . 
    . . . . . . . d d . . . . . . . 
    . . . . . . d . d . . . . . . . 
    `,
img`
    ....eee442eeee624444....
    ..4444eee2ee666664444...
    .4444666666ee22e66ee444.
    4444666ee42e2ee4466e4444
    2444666444ee444ee664ee44
    2266666444e44444e6644ee4
    266664444e444444e44644e2
    224e4444ee4444444e4444e4
    224e4444e4444444e4444ee4
    224e4444e4444444e4444e44
    222e4444e4444444e4444e42
    222e4442ee444444e424e422
    e22ee4422e44444e4424e222
    e222e44222e4444e422ee222
    .e22ee4222ee44ee222e222.
    ...22e42222e44e222ee22..
    `,
img`
    7 . . . 5 4 5 4 5 5 4 5 5 . . . 
    6 7 . 4 4 e 4 4 e 4 4 e 4 5 . . 
    . 6 6 7 4 4 e 4 4 e 4 4 e 4 4 . 
    7 7 6 6 4 4 e 4 4 e 4 4 e 4 e 4 
    . . 7 6 4 4 e 4 4 e 4 4 e 4 e 4 
    . 7 6 6 4 4 e 4 4 e 4 4 e 4 4 . 
    7 6 . e e e 4 4 e 4 4 e 4 e . . 
    6 . . . c e e c e e c e e . . . 
    `
]
numSalvos = 5
ballsPerSalvo = 2
brickMaxNum = 10
brickMinHealth = 1
brickMaxHealth = 3
numBarriers = 0
round = 1
hasBarriers = false
hasTracer = false
let isBricksActive = true
createBricks()
announceRound()
updateHUD()
game.onUpdate(function () {
    spriteutils.placeAngleFrom(
    cursor2,
    spriteutils.degreesToRadians(cursorAngle),
    10,
    cannon
    )
    spriteutils.placeAngleFrom(
    cursor,
    spriteutils.degreesToRadians(cursorAngle),
    20,
    cannon
    )
})
game.onUpdate(function () {
    if (isTracerActive) {
        scene.backgroundImage().drawLine(tracerPrevX, tracerPrevY, tracer.x, tracer.y, 1)
        tracerPrevX = tracer.x
        tracerPrevY = tracer.y
    }
})
game.onUpdate(function () {
    if (!(isFiring)) {
        cursorAngle += controller.dx(100)
        cursorAngle = Math.constrain(cursorAngle, 190, 350)
    }
})
game.onUpdate(function () {
    isBarrierActive = barrier && !(spriteutils.isDestroyed(barrier))
    isTracerActive = tracer && !(spriteutils.isDestroyed(tracer))
    isBallsActive = 0 < sprites.allOfKind(SpriteKind.Projectile).length && !(isTracerActive)
    isBricksActive = 1 < sprites.allOfKind(SpriteKind.Brick).length || 1 == sprites.allOfKind(SpriteKind.Brick).length && !(isBarrierActive)
})
game.onUpdateInterval(500, function () {
    if (!(isBricksActive) && !(isBallsActive)) {
        nextRound()
    }
    if (!(isBallsActive) && numSalvos == 0) {
        info.setScore(round)
        pause(500)
        game.over(false, effects.splatter)
    }
})
