import fs from "fs"
import image1 from "./assets/slides/Kanban old.png"
import image2 from "./assets/slides/Kanban.png"

const dirContent = fs.readdirSync("./assets/slides")
console.log(dirContent)

const images = [image1, image2]

export default images
