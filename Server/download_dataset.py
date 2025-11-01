from roboflow import Roboflow

rf = Roboflow(api_key="TQNuq4DT2gBEsjeLrT8a")
project = rf.workspace("ai-zahxh").project("student-niarl-pfopd")
version = project.version(1)
dataset = version.download("yolov8")              