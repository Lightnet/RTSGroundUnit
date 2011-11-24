/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var currentmat:Material[];
var selected:Material[];
var enemyselected:Material[];
var objmesh:Transform;
var bmousepress:boolean = false;

var mat:Material[];

// Creates an additive-blended material and uses it for rendering
var color = Color.green;

function Start () {
	print ("I'm using " + objmesh.renderer.materials.Length + " material(s)");
	//objmesh.renderer.materials[1] = enemyselected;
	//objmesh.renderer.materials[1] = enemyselected;
	//objmesh.renderer.materials[0] = enemyselected;
	//objmesh.renderer.sharedMaterial = enemyselected;
}

var changeInterval = 0.33; 

function Update () {

	if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
		print("checking...");
		cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);

		var hit : RaycastHit;
		Physics.Raycast(cursorRay, hit);
		if(hit.transform !=null){
			print("name:"+hit.transform.name);
			if(hit.transform == transform){
				var unit = transform.GetComponent(jRTSUnit);
				unit.bselected = true;
				//objmesh.renderer.sharedMaterial  = selected;
				objmesh.renderer.sharedMaterials = selected;
				print("selected");
			}else if(hit.transform.parent ==  transform){
				var unit2 = transform.GetComponent(jRTSUnit);
				unit2.bselected = true;
				//objmesh.renderer.sharedMaterial  = selected;
				objmesh.renderer.sharedMaterials = selected;
			}else{
				objmesh.renderer.sharedMaterials  = currentmat;
			}
		}else{
			objmesh.renderer.sharedMaterials = currentmat;
			print("Deselected");
		}
		
		bmousepress=true;	
	}
	else
	{
		bmousepress = false;
	}


}