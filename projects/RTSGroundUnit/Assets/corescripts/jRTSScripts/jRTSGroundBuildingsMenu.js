/*
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


var prefabbuilding:Transform[];
var prefabbuildingconstuct:Array = new Array();
var currentprefabobj:Transform;

var buildingname;
var bbuildmenu:boolean = false;
var bplace:boolean = false;
var bbuild:boolean = false;
var bmousepress:boolean = false;
var bmouserelease:boolean = false;

var scrollViewVector : Vector2 = Vector2.zero;

var bbuildcheck:boolean = false;

function Start(){
	for(var i = 0; i < prefabbuilding.length ;i++){
		if(prefabbuilding[i] != null){
			var unitbuilding = Instantiate(prefabbuilding[i]);
			//unitbuilding.Start();
			unitbuilding.gameObject.SetActiveRecursively(false);
			prefabbuildingconstuct.Push(unitbuilding);
		}
	}
}

function Update () {
	if(bplace){
		cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit : RaycastHit;
		if(Physics.Raycast(cursorRay, hit)){
		
			//print(hit.transform.root.transform.name);
			
			var buidlinginfo = hit.transform.root.transform.GetComponent(jRTSGroundBuildingUnit);
			
			if((currentprefabobj !=null)&&(buidlinginfo == null)){//this make sure it doesn't over ride position that spawn on top the of another building
				//print(hit.point);
				currentprefabobj.transform.position = hit.point;
			}else{
				//print("There where?");
			}
		}
		
		if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
			bmousepress = true;
		}else if((Input.GetMouseButtonDown(1) == true)&&(bmousepress == false))
		{
			bmousepress = true;
		}else{
			bmousepress = false;
		}
		
		
		if(currentprefabobj !=null){
			var buidlinginfo02 = currentprefabobj.transform.root.transform.GetComponent(jRTSGroundBuildingUnitPlaceCheck);
			if(buidlinginfo02 !=null){
				bbuildcheck = buidlinginfo02.bplace;
				//print(bbuildcheck);
			}
		}
		
		if((Input.GetMouseButtonUp(0) == true)&&(bmouserelease == false)){
			
		}else if((Input.GetMouseButtonUp(1) == true)&&(bmouserelease == false)&&(bbuildcheck == false)){//build building stuff if click
			if((currentprefabobj !=null)){
				var unitbuilding = currentprefabobj.transform.GetComponent(jRTSGroundBuildingUnitPlaceCheck);
				if(unitbuilding.prefabunit !=null){
					var unitbuildingspawn = Instantiate(unitbuilding.prefabunit);
					unitbuildingspawn.transform.position = hit.point;
					setdisableprefab();
					bplace=false;
					//print("build it");
				}
			}
			bmouserelease=true;
			currentprefabobj=null;
		}else{
			bmouserelease = false;
		}
		
		if (Input.GetKeyDown(KeyCode.Escape)) {
			setdisableprefab();//make sure it turn off
			currentprefabobj=null;
			bbuildmenu= false;
		}
	}
}

function  OnGUI(){
	if(GUI.Button(Rect(0,Screen.height -20,100,20),"Build")){
		bbuildmenu=true;
	}
	
	if(bbuildmenu){
		var buttonheight = prefabbuildingconstuct.length * 20;
		scrollViewVector = GUI.BeginScrollView (Rect (10, 20, 135, 160), scrollViewVector, Rect (0, 0, 135, buttonheight));
		for(var i = 0 ; i < prefabbuildingconstuct.length;i++){
			var unitobj = prefabbuildingconstuct[i].transform.GetComponent(jRTSGroundBuildingUnitPlaceCheck);
			if(unitobj !=null){
				if(GUI.Button(Rect(0,20*i,100,20),unitobj.gamename)){
					setdisableprefab();
					prefabbuildingconstuct[i].transform.gameObject.SetActiveRecursively(true);
					currentprefabobj = prefabbuildingconstuct[i];
					bbuildmenu=false;
					bplace=true;
					//print("building");
				}
			}
		}
		// End the ScrollView
		GUI.EndScrollView();
	}
}

function setdisableprefab(){
	for(var i = 0 ; i < prefabbuildingconstuct.length;i++){
		prefabbuildingconstuct[i].transform.gameObject.SetActiveRecursively(false);
	}
}