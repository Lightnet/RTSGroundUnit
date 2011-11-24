/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var projectileprefab:Transform;
var spawnpoint:Transform;
var objectunit:Transform;
var firetime:float = 0;
var firetimecaps:float = 2;
var bfire:boolean = false;
var projectilespeed:float = 200;

var pitchobj:Transform;
var yawobj:Transform;
var rotobj:Transform;

//var weaponattack:float = 0;
var attack:float = 0;

function Update () {

}

function LateUpdate(){
	if((Time.time > firetime)&&(bfire)){
		firetime = Time.time + firetimecaps;
		if(projectileprefab !=null){
			if(spawnpoint !=null){
				var objproectile = Instantiate(projectileprefab,
														spawnpoint.transform.position,
														spawnpoint.transform.rotation);
														
				var groundprojecitle = objproectile.transform.GetComponent(jRTSGroundProjectile);
				var unitobject = objectunit.transform.GetComponent(jRTSUnit);
				if((groundprojecitle !=null)&&(unitobject !=null)){
					groundprojecitle.teamid = unitobject.rtsdata.teamid;
					groundprojecitle.unitobj = objectunit;
					groundprojecitle.weaponattack = attack;
				}				
				objproectile.rigidbody.useGravity=false;
				//objproectile.rigidbody.AddForce(rotobj.transform.forward * projectilespeed);
				objproectile.rigidbody.AddForce(transform.forward * projectilespeed);
			}
		}
	}
}