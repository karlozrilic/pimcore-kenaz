<?php


namespace AppBundle\Form;


use Pimcore\Localization\LocaleService;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class CommentForm extends AbstractType
{
    /**
     * @var LocaleService
     */
    protected $locale;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @var Request
     */
    protected $request;

    /**
     * CheckoutAddressForm constructor.
     * @param LocaleService $locale
     * @param TranslatorInterface $translator
     * @param Request $request
     */
    public function __construct(LocaleService $locale,
                                TranslatorInterface $translator,
                                RequestStack $request)
    {
        $this->locale = $locale;
        $this->translator = $translator;
        $this->request = $request->getMasterRequest();
    }

    /**
     * @inheritDoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('authorName', TextType::class, [
                'label' => $this->translator->trans('general.first_name'),
                'constraints' => [
                    new NotBlank([
                        'message' => $this->translator->trans("Please insert your name"),
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 100,
                        'minMessage' => $this->translator->trans("Name must contain at least 3 characters"),
                        'maxMessage' => $this->translator->trans("Name should be less than 100 characters"),
                    ])
                ]
            ])
            ->add('authorEmail', TextType::class, [
                'label' => $this->translator->trans('general.email'),
                'constraints' => [
                    new NotBlank([
                        'message' => $this->translator->trans("Please enter your email address"),
                    ]),
                    new Length([
                        'min' => 5,
                        'max' => 254,
                        'minMessage' => $this->translator->trans("Name must contain at least 5 characters"),
                        'maxMessage' => $this->translator->trans("Name should be less than 254 characters"),
                    ]),
                    new Email([
                        'message' => $this->translator->trans("Please enter valid email address"),
                    ])
                ]
            ])
            ->add('content', TextareaType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => $this->translator->trans("Please enter comment"),
                    ]),
                    new Length([
                        'min' => 2,
                        'minMessage' => $this->translator->trans("Comment must contain at least 1 character"),
                    ]),
                ]
            ])->add('_submit', SubmitType::class, [
                'label' => $this->translator->trans('checkout.submit-address'),
            ]);;
    }

    /**
     * @inheritDoc
     */
    public function getBlockPrefix()
    {
        // we need to set this to an empty string as we want _username as input name
        // instead of login_form[_username] to work with the form authenticator out
        // of the box
        return '';
    }

    /**
     * @inheritDoc
     */
    public function configureOptions(OptionsResolver $resolver)
    {
    }
}
