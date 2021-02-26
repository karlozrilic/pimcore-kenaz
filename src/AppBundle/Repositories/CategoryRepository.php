<?php


namespace AppBundle\Repositories;


use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Category\Listing;
use Zend\Paginator\Paginator;

class CategoryRepository
{

    public function getCategories($folderId) {
        $folder = Folder::getById($folderId);

        $categoryListing = new Listing();
        $categoryListing->setCondition('o_parentId = ? AND o_classId = ("category")', [$folder->getId()]);
        $categoryListing->setLimit(20);

        return $categoryListing->getObjects();
    }

    /**
     * @param Category $category
     * @param $page
     * @param $limit
     *
     * @return Paginator
     */
    public function getCategoryPosts($category, $page, $limit) {
        $newsListing = new \Pimcore\Model\DataObject\Post\Listing();
        $newsListing->setOrderKey("publishDate");
        $newsListing->setOrder("desc");
        $newsListing->setCondition('category like ?', ['%' . $category->getId() . '%']);

        $paginator = new Paginator($newsListing);
        $paginator->setCurrentPageNumber($page);
        $paginator->setItemCountPerPage($limit);

        return $paginator;
    }
}
