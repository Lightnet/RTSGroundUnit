/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/


var IconWidth : int = 16; //change the width image
var IconHeight : int = 16;  //change the height image
var IconDisplayTexture : Texture2D;
var EnemyIconDisplayTexture : Texture2D;
var SelectedIconDisplayTexture : Texture2D;
var screenPosition : Vector3;
var hudoffset:Vector3 = new Vector3();
var scale=1;
var scaledis = 10;//every time the main camera is move away salce the gui texture
var drawrange = 10000;//draw limit incase for zoom out or far out of range that doesn't need to render in gui
var unitobj;

function Start(){
	unitobj = transform.GetComponent(jRTSUnit);
}

function Update () {

}

function OnGUI(){
	if(Camera.main != null){
		var dis = Vector3.Distance(Camera.main.transform.position,transform.position);
		if (dis  < drawrange){
			screenPosition = Camera.main.WorldToScreenPoint((transform.position + hudoffset));
			//scale = (dis/scaledis);
			//if(scale == 0){scale = 1;}
			screenPosition.y = (Screen.height - screenPosition.y); // the GUI coordinate system is upside down relative to every other coordinate system
			
			if(unitobj !=null){
				if(unitobj.bselected == true){
					//draw to scale and center the texture current position
					GUI.DrawTexture(Rect(screenPosition.x - (IconWidth/2)/scale, screenPosition.y - (IconHeight/2)/scale, IconWidth/scale, IconHeight/scale), SelectedIconDisplayTexture);
				}else{
					GUI.DrawTexture(Rect(screenPosition.x - (IconWidth/2)/scale, screenPosition.y - (IconHeight/2)/scale, IconWidth/scale, IconHeight/scale), IconDisplayTexture);
				}				
			}else{
				//draw to scale and center the texture current position
				GUI.DrawTexture(Rect(screenPosition.x - (IconWidth/2)/scale, screenPosition.y - (IconHeight/2)/scale, IconWidth/scale, IconHeight/scale), IconDisplayTexture);
			}
		}
	}
}