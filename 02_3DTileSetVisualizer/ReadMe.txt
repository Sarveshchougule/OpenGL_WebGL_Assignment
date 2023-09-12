(#) For Local Machine --
Double Click on 3jsmain.html to Run the File on Local machine.

+++ For Texture to display on FireFox browser :- 
Enter in URL Section "about:config"
Then Click on "Accept the Risk and Continue"
Then Search "content.cors.disable" and make it "TRUE"
Then Search "security.fileuri.strict_origin_policy" and make it "FALSE"

+++ For Texture to display on Chrome / Edge / Opera browser :- 
Goto Desktop and you will see Browser Icon Like Chrome, Edge, Opera.
Select That Shortcut Application and Right Click on Application.
Then Select Properties, and a properties window will appear.
Then in Target Edit Box type this <File Path>"C:\Program Files\Google\Chrome\Application\chrome.exe"<After Double Coat give space and type this> --allow-file-access-from-files --user-data-dir="C:\tempChrome"
For --user-data-dir="C:\tempChrome" I made a Folder in tempChrome for Chrome Application.
Same you can make it for Edge Application and Opera Application.
### Use any one of these in target Edit box.
1. " .... " --allow-file-access-from-files --user-data-dir="C:\tempChrome"
2. " .... " --disable-web-security --user-data-dir="C:\tempEdge"


(#) For Firebase --
Open this link :- .
3d Tile Set Visualizer is Deployed on Firebase above link.

--: Details :- 
'3jsmain.html' display textual information.

'3jsmain.js' has all ThreeJS Code for rendering the 3D Tiles Renderer using Cesium Ion. 

3D Tiles Renderer using Cesium Ion is taken as reference from :- NASA-AMMOS, https://github.com/NASA-AMMOS/3DTilesRendererJS/tree/master .

FlyOrbitControls.js and all other .js files in 'src' folder is taken as reference from :- NASA-AMMOS, https://github.com/NASA-AMMOS/3DTilesRendererJS/tree/master .

For 3JS reference i used documentation site :- https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene .

### Question ###
Create 3D tiles with custom building data and write a 3D tile set visualizer in ThreeJS.
3D tiles is a new 3D data streaming standard that can be used for visualizing large 3D areas.
You need to create a tile set with custom data using Cesium Ion. The custom buildings for now can be a bunch of cubes. (No need to create new 3D models).
The data uploaded to Cesium ion should be visualized using a 3D Tile Visualizer. Please refer to the Cesium viewer and implement the same in the solution.

Thanks, 
Sarvesh Kiran Chougule
sarveshchougule@gmail.com