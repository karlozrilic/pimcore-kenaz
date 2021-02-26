<?php


namespace AppBundle\Repositories;


use Pimcore\File;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Subscriber;

class SubscriberRepository
{
    const SUBSCRIBERS_FOLDER = '/Subscribers/Newsletter Subscribers';

    /**
     * Save new subscriber
     *
     * @param $email
     * @return Subscriber
     * @throws \Exception
     */
    public function subscribeUser($email) {
        $subscribers = $this->subscriberExists($email);

        if (!empty($subscriber)) {
            return $subscriber[0];
        }

        $subscriber = new Subscriber();
        $subscriber->setPublished(true);
        $subscriber->setEmail($email);
        $subscriber->setKey(File::getValidFilename($email));
        $subscriber->setParent(AbstractObject::getByPath(self::SUBSCRIBERS_FOLDER));
        $subscriber->save();

        return $subscriber;
    }

    /**
     * @param $email
     * @return array
     */
    public function subscriberExists($email) {
        return Subscriber::getByEmail($email)->getObjects();
    }
}
