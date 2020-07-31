<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername("Squalli");
        
        $plainPassword = 'admin';
        $encoded = $this->passwordEncoder->encodePassword($user, $plainPassword);

        $user->setPassword($encoded);

        $manager->persist($user);

        $manager->flush();
    }
}
