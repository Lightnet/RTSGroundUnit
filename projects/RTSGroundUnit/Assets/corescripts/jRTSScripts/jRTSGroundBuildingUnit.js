/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var gamename:String = "";
var information:String = "";
var buy:float = 0.0;
var sell:float = 0.0;

var bconstruction:boolean = false;
var bproducingresource:boolean = false;
var bproducingunits:boolean = false;

var bdisable:boolean = false;
var timebuild:float = 10;
var timedeploy:float = 10;
var timepackup:float = 10;
var bselected:boolean = false;

var spawnpoints:Array = new Array();
var transformpoint:Transform[];
var transformpointcount:float =0;

public static var buildings:Array = new Array();

public var unitsprefab:Transform[];

public var units:Array = new Array();
public var unitquery:Array = new Array();

private var unitbuildingmenuRect = Rect (440, 0, 160, 400);
var scrollViewVector : Vector2 = Vector2.zero;
var scrollViewVector2 : Vector2 = Vector2.zero;
var texttimespawn;
var texttime;

var power:float = 0;
var powercost:float = 0;
var crystal:float = 0;
var gas:float = 0;
var ore:float = 0;
var taticalpoint:float = 0;

var producetime:float = 0;
var producetimecaps:float = 10;

var count:float = 0;

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
var drawrange = 100;//draw limit incase for zoom out or far out of range that doesn't need to render in gui
var drawinforange = 100;//draw limit incase for zoom out or far out of range that doesn't need to render in gui

var objunit;


function Start(){
	buildings.Push(transform);
	for(var i = 0;i <unitsprefab.length;i++ ){
		units.Push(unitsprefab[i]);
	}
	//incase it add on automatue when it starts
	producetime = Time.time + producetimecaps;
	
	var unitobj = transform.GetComponent(jRTSUnit);
	if(unitobj !=null){
		objunit = unitobj;
	}
}

function FixedUpdate(){
	//count++;
}

function LateUpdate(){
	//count++;
	if(bproducingresource){
		if(Time.time > producetime){
			producetime = Time.time + producetimecaps;
			jRTSGroundBuildingSelected.crystal += crystal;
			jRTSGroundBuildingSelected.gas += gas;
			jRTSGroundBuildingSelected.ore += ore;
			jRTSGroundBuildingSelected.taticalpoint += taticalpoint;
			print("add resource" + jRTSGroundBuildingSelected.crystal +":" + jRTSGroundBuildingSelected.gas + ":" + jRTSGroundBuildingSelected.taticalpoint );
		}
	}
}

function Update () {
	if(unitquery.length > 0){
		var unitq = unitquery[0].transform.GetComponent(jRTSGroundUnitControl);
		unitq.InitSpawn(Time.time);
		texttimespawn = "Spawn Time:"+ (unitq.unittime - Time.time);
		if( Time.time > unitq.unittime){
			var objunit = Instantiate(unitquery[0]);			
			if(transformpoint.length > 0){
				objunit.transform.position = transformpoint[0].transform.position;
				objunit.transform.rotation = transformpoint[0].transform.rotation;
			}
			unitq.ResetSpawn();
			texttimespawn=null;
			unitquery.RemoveAt(0);			
		}		
	}
}

function OnGUI(){
	
	if(bselected){
		//GUI.Label(Rect(0,20,100,20),gamename);
		unitbuildingmenuRect = GUI.Window (0, unitbuildingmenuRect , charskillsmenu, gamename);
	}
	
	if(Camera.main != null){
		var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
		screenPosition = Camera.main.WorldToScreenPoint((transform.position + hudoffset));
		scale = (dis/scaledis);
		if(scale == 0){scale = 1;}
		
		if(dis  < drawinforange){
			screenPosition.y = (Screen.height - screenPosition.y); // the GUI coordinate system is upside down relative to every other coordinate system
			//draw to scale and center the texture current position
			if(objunit !=null){
				GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, healthBarWidth/scale, healthBarHeight/scale), healthBarTexture);
				
				var percent:float = 1.0;
				percent = objunit.rtsdata.health/objunit.rtsdata.healthcaps;
				
				if(percent < 0){percent = 0;}
				if(percent > 1){percent = 1;}
				
				//print(percent +"<>"+ health + "<>"+healthcaps);
				GUI.DrawTexture(Rect(screenPosition.x - (healthBarWidth/2)/scale, screenPosition.y - (healthBarHeight/2)/scale, (healthBarWidth * percent)/scale, healthBarHeight/scale), healthBarTextureFull);
				GUI.Label(Rect(screenPosition.x - (healthBarWidth/2)/scale,(TextPosition.y + screenPosition.y) - (healthBarHeight/2)/scale,100, 20), objunit.rtsdata.name);
			}		
		}
		
		if (dis  < drawrange){
			scale=1;
			if(objunit !=null){
				if((objunit.bselected ==true)||(bselected ==true)){
					GUI.DrawTexture(Rect(screenPosition.x - (IconWidth/2)/scale,(screenPosition.y) - (IconHeight/2)/scale, IconWidth/scale, IconHeight/scale), SelectedIconDisplayTexture);
				}else{
					GUI.DrawTexture(Rect(screenPosition.x - (IconWidth/2)/scale,(screenPosition.y) - (IconHeight/2)/scale, IconWidth/scale, IconHeight/scale), IconDisplayTexture);
				}
			}
		}
		
	}
}

function charskillsmenu(windowID : int){
	if(GUI.Button( new Rect(0,0,20,20),"x")){
		bselected=false;
	}
	
	var buttonheight = units.length * 20;
	
	scrollViewVector = GUI.BeginScrollView (Rect (10, 20, 135, 160), scrollViewVector, Rect (0, 0, 135, buttonheight));
	for(var i = 0 ; i < units.length;i++){
		var unitobj = units[i].transform.GetComponent(jRTSUnit);
		if(unitobj !=null){
			if(GUI.Button(Rect(0,20*i,100,20),unitobj.rtsdata.name)){
				var newunit:Transform = units[i];
				addquerylist(newunit);
			}
		}
	}
	// End the ScrollView
	GUI.EndScrollView();
	
	
	if(texttimespawn != null){
		//print("text show me");
		//texttime = texttimespawn
		GUI.Label(Rect(10,200,200,20),texttimespawn);
		GUI.Label(Rect(50,180,200,20),"Co:"+count);
	}
	
	
	buttonheight = unitquery.length * 20;
	scrollViewVector2 = GUI.BeginScrollView (Rect (10, 220, 135, 180), scrollViewVector2, Rect (0, 0, 135, buttonheight));
	
	for(i = 0 ; i < unitquery.length;i++){
		var unitobj2 = unitquery[i].transform.GetComponent(jRTSUnit);
		if(unitobj2 !=null){
			if(GUI.Button(Rect(0,20*i,100,20),unitobj2.rtsdata.name)){
				unitquery.RemoveAt(i);
				break;
			}			
		}
	}
	// End the ScrollView
	GUI.EndScrollView();
	//GUI.DragWindow (Rect (0,0,600,600));
}

function addquerylist(obj){
	unitquery.Push(obj);
}
