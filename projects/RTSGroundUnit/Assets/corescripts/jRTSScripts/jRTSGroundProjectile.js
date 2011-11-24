/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var teamid:int;
var unitobj:Transform;
var weaponattack:float = 0;
var attack:float = 0;
//var weapondamge:float = 0;
var damage:float = 0;

function OnCollisionEnter(collision : Collision) {
	if(collision.transform !=null){
		//print(collision.transform.name);
		var objunit = collision.transform.GetComponent(jRTSUnit);
		if(objunit !=null){
			if(unitobj != collision.transform){
				damage = weaponattack + attack;
				if(objunit.rtsdata.teamid != teamid){
					//damage = weaponattack + attack;
					objunit.rtsdata.health -= damage;
				}else{
					objunit.rtsdata.health -= damage;
				}
				Destroy(gameObject);
			}
			//print("hit unit");
			//Destroy(gameObject);
		}
	}
	//print("hit");
}

function Update () {

}