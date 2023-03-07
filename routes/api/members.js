const e = require('express')
const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members')

// Get All Members
router.get('/', (req, res) => res.json(members))

// Get Single Member

router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === Number(req.params.id))
  found
    ? res.json(members.filter(item => item.id === Number(req.params.id)))
    : res.status(400).json({ msg: `No member with the id ${req.params.id}` })
  // It is best practice to not tell the user which data he is entering wrongly
})

// Create Member

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: `Please include a valid name and email!` })
  }

  members.push(newMember)
  res.json(members)
})

// Update Member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === Number(req.params.id))

  if (found) {
    const updatedMember = req.body
    members.forEach(member => {
      if (member.id === Number(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name
        member.email = updatedMember.email ? updatedMember.email : member.email

        res.json({ message: 'Member updated', member })
      }
    })
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` })
  }
})

// Delete Member

router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === Number(req.params.id))

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== Number(req.params.id))
    })
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` })
  }
  // It is best practice to not tell the user which data he is entering wrongly
})

module.exports = router
