const router = require('express').Router();
const { Comment, Post } = require('../../models');

// get comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id',
            'comment_text',
            'user_id',
            'created_at'
        ],
        order: [['created_at', 'ASC']]
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     },
        //     {
        //         model: Post,
        //         attributes: ['title']
        //     }
        // ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;