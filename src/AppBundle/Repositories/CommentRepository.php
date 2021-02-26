<?php


namespace AppBundle\Repositories;


use AppBundle\Form\CommentForm;
use Pimcore\File;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Comment;
use Pimcore\Model\DataObject\Comment\Listing;
use Pimcore\Model\DataObject\Post;
use Symfony\Component\Form\FormInterface;

class CommentRepository
{
    /**
     * @param int $limit
     * @return array
     */
    public function getRandomComments($limit = 5) {
        $comments = new Listing();
        $comments->setOrderKey("RAND()", false);
        $comments->setLimit($limit);
        return $comments->getObjects();
    }

    /**
     * @param FormInterface $commentForm
     * @param Post $post
     * @throws \Exception
     */
    public function saveComment($commentForm, $post) {
        $data = $commentForm->getData();

        $comment = new Comment();
        $comment->setPublished(true);
        $comment->setAuthorEmail($data['authorEmail']);
        $comment->setAuthorName($data['authorName']);
        $comment->setContent($data['content']);
        $comment->setKey(File::getValidFilename($data['authorEmail'] . '-' . uniqid()));
        $comment->setParent(AbstractObject::getByPath($post->getRealFullPath()));
        $comment->save();

        $comments = $post->getComments();
        $comments[] = $comment;

        $post->setComments($comments);
        $post->save();
    }
}
