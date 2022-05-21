// Learn TypeScript:

//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    jumpHeight: number = 0;
        @property
        jumpDuration: number = 0;
        @property
        maxMovementSpeed: number = 0;
        @property
        accel: number = 0;
    jumpAction: any;
    accRight: boolean;
    accLeft: boolean;
    xSpeed: number;

    // LIFE-CYCLE CALLBACKS:
    setJumpAction(){
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionInOut());

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.accRight = true;
                console.log('d');
                break;
            case cc.macro.KEY.a:
                this.accLeft = true;
                console.log('a');
                break;
        }
    }
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.accRight = false;
                console.log('release d');
                break;
            case cc.macro.KEY.a:
                this.accLeft = false;
                console.log('release a');
                break;
        }
    }

    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction); 

        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown,this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp,this)
    }

    start () {

    }

    update (dt) {
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        }
        if(this.accRight){
            this.xSpeed += this.accel * dt;
        }
        if(Math.abs(this.xSpeed) > this.maxMovementSpeed){
            this.xSpeed = this.maxMovementSpeed * this.xSpeed/Math.abs(this.xSpeed)
        }
        this.node.x += this.xSpeed * dt
    }
}
