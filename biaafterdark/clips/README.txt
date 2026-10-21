Drop 2-4 vertical clips here, named clip-1.mp4, clip-2.mp4 ... (clip-4.mp4 max).
Optional posters: clip-1.jpg, clip-2.jpg ...
The BIA page shows this section only if at least one clip loads.

Shrink a clip for the web (keeps ~4-6 MB for 8-15 sec):
  ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -crf 27 -preset slow -movflags +faststart -an clip-1.mp4
(-an removes audio; leave it out if you want the "Sound on" button to play the track.)
