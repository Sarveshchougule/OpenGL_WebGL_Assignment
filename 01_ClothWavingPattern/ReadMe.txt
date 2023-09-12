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
Open this link :- https://cloth-waving-assignment-3js.web.app/ .
Cloth Wave Pattern Rendering is Deployed on Firebase above link.

--: Details :- 
'3jsmain.html' has Vertex shader code and Fragment shader code where all the logic is implemented using 3D Noise.

3D Noise is taken as reference from :- Simplex 3D Noise by Ian McEwan, Ashima Arts, https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83 .

'3jsmain.js' has all ThreeJS Code for rendering the Cloth Wave Pattern using Plane Geometry. 

Plane Geometry is taken as reference from :- threejs.org Documentation site, https://threejs.org/docs/index.html?q=Plane#api/en/geometries/PlaneGeometry .

All the logic for Cloth Wave Pattern using Plane Geometry using 3D Noise is taken as reference from :- Codrops website, https://tympanus.net/codrops/2020/03/17/create-a-wave-motion-effect-on-an-image-with-three-js/ .

Carpet Image is taken as reference from :- website, https://t4.ftcdn.net/jpg/04/51/66/03/360_F_451660361_JoXcfodE9tKs1GSJKZwm96mPwrqjeEub.jpg .

### Example Folder and example file ###
Is the question "Create a plane in ThreeJS and write a shader to create a cloth-waving pattern, as shown in the following GIF" .
And the answer is "3jsmain.html" and "3jsmain.js" .

Thanks, 
Sarvesh Kiran Chougule
sarveshchougule@gmail.com
