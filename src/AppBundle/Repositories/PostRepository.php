<?php


namespace AppBundle\Repositories;


use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Post;
use Pimcore\Model\DataObject\Post\Listing;

class PostRepository
{

    public function getPosts($folderId) {
        $folder = Folder::getById($folderId);

        $postListing = new Listing();
        $postListing->setCondition('o_parentId = ? AND o_classId = ("post")', [$folder->getId()]);
        $postListing->setLimit(20);

        return $postListing->getObjects();
    }

    /**
     * @param $id
     * @return \Pimcore\Model\DataObject\AbstractObject|\Pimcore\Model\DataObject\Concrete|Post|null
     */
    public function getPost($id) {
        return Post::getById($id);
    }
}
