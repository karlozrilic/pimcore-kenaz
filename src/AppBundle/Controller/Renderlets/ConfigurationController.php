<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\ConfigurationRepository;
use Symfony\Component\HttpFoundation\Request;

class ConfigurationController extends BaseController
{
    private $confRepository;

    public function __construct(ConfigurationRepository $confRepository)
    {
        $this->confRepository = $confRepository;
    }

    public function confAction(Request $request) {
        return [
            'configuration' => $this->confRepository->getConf($request->get('id'))
        ];
    }
}
