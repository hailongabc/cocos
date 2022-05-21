// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   @property(cc.Prefab)
   meatPrefab:cc.Prefab = null;
   @property(cc.Node)
   ground:cc.Node = null;
   @property
   maxMeatDuration: number = 0;
   @property
   minMeatDuration: number = 0;
   @property(cc.Node)
   manage:cc.Node = null;
groundY: any;

    spawnNewMeat(){
        var newMeat = cc.instantiate(this.meatPrefab);
        this.node.addChild(newMeat);
        newMeat.addComponent(cc.CircleCollider);
        newMeat.getComponent(cc.CircleCollider).radius = 60;
        newMeat.group = '1046769';  
        newMeat.setPosition(this.getNewMeatPosition());
    }
    getNewMeatPosition(){
        var randX = 0;
        var randY = this.groundY = Math.random() * this.manage.getComponent('manage').jumpHeight + 50;
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX,randY);
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        this.spawnNewMeat()
    }

    start () {

    }

    // update (dt) {}
}
