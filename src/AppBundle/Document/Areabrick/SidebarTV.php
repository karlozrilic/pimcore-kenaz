<?php

namespace AppBundle\Document\Areabrick;

use AppBundle\Repositories\CommentRepository;
use AppBundle\Repositories\NewsRepository;
use AppBundle\Repositories\TvRepository;
use Pimcore\Model\DataObject\Banner;
use Pimcore\Model\Document\Tag\Area\Info;

class SidebarTV extends AbstractAreabrick
{
    /**
     * @var TvRepository
     */
    private $tvRepository;

    public function __construct(TvRepository $tvRepository)
    {
        $this->tvRepository = $tvRepository;
    }

    public function getName()
    {
        return 'Sidebar TV';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }

    public function action(Info $info) {
        $view = $info->getView();
        $view->video = $this->tvRepository->getTopVideo();
    }
}
