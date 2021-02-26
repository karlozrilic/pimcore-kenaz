<?php


namespace AppBundle\Controller;


use AppBundle\Repositories\SubscriberRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class NewsletterController extends BaseController
{
    /**
     * @var SubscriberRepository
     */
    protected $subscriberRepository;

    protected $translator;

    /**
     * NewsletterController constructor.
     * @param SubscriberRepository $subscriberRepository
     * @param TranslatorInterface $translator
     */
    public function __construct(SubscriberRepository $subscriberRepository, TranslatorInterface $translator)
    {
        $this->subscriberRepository = $subscriberRepository;
        $this->translator = $translator;
    }

    /**
     * @Route("subscribe", name="subscribe")
     *
     * Subscribe new user
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Exception
     */
    public function subscribeAction(Request $request) {
        if (!filter_var($request->get('email'), FILTER_VALIDATE_EMAIL)) {
            return $this->getErrorResponse($this->translator->trans("Please enter valid email address"));
        }

        $subscriber = $this->subscriberRepository->subscribeUser($request->get('email'));

        if ($subscriber) {
            return $this->getSuccessResponse($subscriber, $this->translator->trans("You have successfully subscribed to our channel"));
        }

        return $this->getErrorResponse($this->translator->trans("There was an error saving new subscriber. Please try again"));
    }
}
