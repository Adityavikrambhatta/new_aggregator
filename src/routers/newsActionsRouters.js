const express = require("express");
const router = express.Router();
const path = require('path');
const User = require(path.join("..", "models", "User.js"))
const { aggregateNews } = require(path.join("..", "helpers", "newsActionHelper.js"))

router.get('/preferences', (req, res) => {

    if (req.user) {
        User.findOne({ _id: req.user.id }).then(data => {
            var { preferences } = data
            return res.status(200).json({ preferences })

        }).catch(err => {
            return res.status(401).json({ message: "Preferences not found." })
        })
    } else {
        res.status(200).send(" Unable to Auhtneticate.")
    }
});

router.get('/news', (req, res) => {
    if (req.user) {
        User.findOne({ _id: req.user.id }).then(data => {
            var { preferences = [] } = data
            aggregateNews(preferences, req, res)
        }).catch(err => {
            return res.status(500).send("Preferences not found.")
        })
    } else {
        res.status(403).send("Unable to Authenticate.")
    }
});


router.put('/preferences', (req, res) => {
    var { id } = req.body
    var newPreference = req.body.preferences
    if (req.user) {
        User.findOne({ _id: req.user.id }).then(data => {
            var { preferences = [] } = data
            var lowerCasePreference = []
            preferences.map(preference => lowerCasePreference.push(preference.toLowerCase()))
            // console.log(typeof(newPreference) == 'string')
            if (typeof (newPreference) == 'string') {
                console.log(typeof (newPreference) == 'string')
                if (lowerCasePreference.includes(newPreference.toLowerCase())) {
                    return res.status(500).json({ message: "Duplicate Preference", error: err })
                }
                else {
                    newPreference = [...preferences, newPreference]
                }
            } else {
                let tempList = newPreference.filter(newPreference => lowerCasePreference.includes(newPreference.toLowerCase()))
                console.log("tempList ", tempList)
                if (tempList.length > 0) {
                    return res.status(500).json({ message: "Duplicate Preference" })
                }
                else {
                    newPreference = [...preferences, ...newPreference]
                }
            }
            console.log("newPreference ", preferences, " id", id)

            User.findByIdAndUpdate(id, { preferences: newPreference }).then(data => {
                console.log(data, " data ")
                return res.status(200).json({ preferences: data, message: " Is successfully updated. " })
            }).catch(err => {
                return res.status(500).json({ message: "Preferences not updated. ", error: err })
            })
        }).catch(err => {
            return res.status(500).send("Preferences not found.")
        })
    } else {
        res.status(401).send("Unable to Authenticate.")
    }

})


module.exports = router