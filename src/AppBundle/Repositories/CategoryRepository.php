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
        $paginator->setPageRange(ceil(count($newsListing)/$limit));

        return $paginator;
    }

    public function getCategoryPostsLimited($category, $limit = 5) {
        $categoryListing = new \Pimcore\Model\DataObject\Post\Listing();
        $categoryListing->setOrderKey("publishDate");
        $categoryListing->setOrder("desc");
        $categoryListing->setCondition('category like ?', ['%' . $category->getId() . '%']);
        $categoryListing->setLimit($limit);

        return $categoryListing->getObjects();
    }

    public function getCategoryName($categoryId) {
        $category = new Listing();
        $category->addConditionParam('oo_id = ?', [$categoryId]);

        return $category->getObjects();
    }

}
