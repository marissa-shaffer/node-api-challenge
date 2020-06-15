const express = require("express")
const projects = require("../helpers/projectModel")

const router = express.Router()

router.post("/", (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Please provide name and description for project"
        })
    }
    projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((error) => {
        res.status(500).json({
            message: "An error occured while saving your project"
        })
    })
})

router.get("/:id", (req, res) => {
    projects.get(req.params.id)
    .then((project) => {
        if(project) {
            res.status(200).json(project)
        }else {
            res.status(404).json({
                message: "Project not found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving project"
        })
    })
})

module.exports = router