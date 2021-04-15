<?php

namespace AppBundle\Document\Areabrick;

use AppBundle\Repositories\CommentRepository;
use AppBundle\Repositories\NewsRepository;
use Pimcore\Model\DataObject\Banner;
use Pimcore\Model\Document\Tag\Area\Info;

class SidebarNews extends AbstractAreabrick
{
    /**
     * @var NewsRepository
     */
    private $newsRepository;

    /**
     * @var CommentRepository
     */
    private $commentRepository;

    public function __construct(NewsRepository $newsRepository,
                                CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
        $this->newsRepository = $newsRepository;
    }

    public function getName()
    {
        return 'Sidebar news';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }

    public function action(Info $info) {
        $view = $info->getView();
        $view->comments = $this->commentRepository->getRandomComments();
        $view->news = $this->newsRepository->getRandomNews();
        $view->topRated = $this->newsRepository->getRandomNews();
    }
}
