/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


var gamename:String = "";
var buildtime:float = 0;
var buildtimecaps:float = 10;
var delaytime:float = 0;
var delaytimecaps:float = 0;
var destorytime:float = 2;

var bfinishbuilding:boolean = false;

var unitbuildingprefab:Transform;


var IconWidth : int = 16; //change the width image
var IconHeight : int = 16;  //change the height image
var IconDisplayTexture : Texture2D;
var EnemyIconDisplayTexture : Texture2D;
var SelectedIconDisplayTexture : Texture2D;

var healthBarWidth : int = 100; //change the width image
var healthBarHeight : int = 12;  //change the height image
var healthBarTexture : Texture2D;
var healthBarTextureFull : Texture2D;

var screenPosition : Vector3;
var hudoffset:Vector3 = new Vector3();
private var TextPosition : Vector3 = new Vector3(0,-20,0);
private var IconPosition : Vector3 = new Vector3(0,-40,0);
var scale=1;
var scaledis = 10;//every time the main camera is move away salce the gui texture
private var drawrange = 100;//draw limit incase for zoom out or far out of range that doesn't need to render in gui
private var drawinforange = 100;//draw limit incase for zoom out or far out of range that doesn't need to render in gui

var objunit;

function Start(){
	animation.Play("startupbuild");
	buildtime = Time.time + buildtimecaps;
	if(unitbuildingprefab !=null){
		var unitobj = unitbuildingprefab.transform.GetComponent(jRTSUnit);
		objunit = unitobj;
	}
}

function Update () {
	if(bfinishbuilding == false){
		/*
		if(!animation.IsPlaying){
			animation.Play("idlebuild");
		}
		*/
	}
	
	if((Time.time > buildtime)&&(bfinishbuilding == false)){
		animation.Stop();
		animation.Play("buildfinish");
		print("finish....");
		bfinishbuilding = true;
		if(unitbuildingprefab !=null){
			var objunit = Instantiate(unitbuildingprefab,transform.position,transform.rotation);
			Destroy(gameObject,destorytime);
		}
	}
}

function OnGUI(){
	if(bfinishbuilding ==false){
		if(Camera.main != null){
			var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
			screenPosition = Camera.main.WorldToScreenPoint((transform.position + hudoffset));
			scale = (dis/scaledis);
			if(scale == 0){scale = 1;}
			
			if((dis  < drawinforange)){
				screenPosition.y = (Screen.height - screenPosition.y); // the GUI coordinate system is upside down relative to every other coordinate system
				//draw to scale and center the texture current position
				if(objunit !=null){
					GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), healthBarTexture);
					
					var percent:float = 1.0;
					
					var timebuild = buildtime - Time.time;
					//print(timebuild);
					
					percent =  ( 1 - (timebuild/buildtimecaps));
					//print(percent);
					
					if(percent < 0){percent = 0.01;}
					if(percent > 1){percent = 1;}
					
					//print(percent +"<>"+ health + "<>"+healthcaps);
					GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, (healthBarWidth * percent)/scale, healthBarHeight/scale), healthBarTextureFull);
					GUI.Label(Rect(screenPosition.x - (healthBarWidth/2)/scale,(TextPosition.y + screenPosition.y) - (healthBarHeight/2)/scale,100, 20), objunit.rtsdata.name);
				}		
			}
		}
	}
}