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
   pickMeat: number = 0;

    // LIFE-CYCLE CALLBACKS:
    
    onCollisionEnter(selfCollider, otherCollider){
        if(otherCollider.name == '1046769<CircleCollider>'){
           
             this.node.destroy();
        }
        
    }
    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    }

    start () {

    }

    // update (dt) {}
    onDestroy(){
        this.node.destroy();
        this.node.parent.getComponent('game').spawnNewMeat();
    }
}
