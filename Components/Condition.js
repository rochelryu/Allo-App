import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {  WebBrowser } from 'expo';

import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#4dbcc7"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class Condition extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            isFont:false,
            backClickCount: 0,
            name:"",
            modalVisible: false,
        }
    }
    _handlePress = () => {
        //Linking.openURL('www.allosanteexpress.com');
        WebBrowser.openBrowserAsync('https://www.allosanteexpress.com');
      };
    async componentDidMount() {
        StatusBar.setHidden(false);
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        this.setState({
            isFont:true
        })
    }
    render() {
        if(this.state.isFont) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "CGU", style: { color: '#4dbcc7' } }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ScrollView style={styles.padding}>
                    <Text style={styles.app}>Bienvenue sur ATALIA – ALLÔ SANTE EXPRESS </Text>
                    <Text style={styles.title}>Préambule </Text>
                    <Text style={styles.titleT}>Les présentes conditions générales d’utilisation et de service en ligne régissent l’ensemble des relations entre la société ATALIA- ALLO SANTE EXPRESS et sa clientèle, dans le cadre d’une plateforme de mise en relation à distance , les deux parties les acceptant sans réserve.
Les présentes conditions générales sont consultables en ligne à l’adresse principale du site ou de l’application mobile telechargeables et prévalent sur tout autre support de reproduction.
Avant de faire la demande d’unservice via la plateforme ATALIA-ALLO SANTE EXPRESS auprés des professionnels de santé
L’utilsateur donneur d’ordre ainsi que le service médical déclarent avoir pris connaissance des dispositions qui suivent et en acceptent expressement et irrevocablement les termes ci-après enoncés.
Dans le cadre de la mise en relation entres les professionnels de santé et les utilisateurs, ATALIA- ALLO SANTE EXPRESS s’engage sur la qualité des prestations de services et veille au respect par chacun des engagelents qui suivent dans le cadre d’un contrat et d’une charte de confidentialité.</Text>
                    <Text style={styles.title}>INFORMATIONS LEGALES </Text>
                    <Text style={styles.titleT}>le présent site web /application mobile est edité par :
ATALIA sarl- ALLO SANTE EXPRESS,( marque commerciale ALLO SANTE EXPRESS) dont le siége est situé : Abidjan-residence halama  15 BP 305 ABJ 15 – TEL : Côte d’ivoire : +(225) 66 000 700-France : +(33)687412377
 Courrier electronique :Ataliasarl.ase@gmail.com
Le directeur de la publicationde l’application est : Monsieur JOSEPH  EL BACHA
Le site et cette base de données sont hébergés chez un hebergeur  de données Allemand .
DEFINITIONS
« SITE » ou « APPLICATION MOBILE » ou « PLATEFORME » : site de mise en relation accessible à l’adresse www.allosanteexpress.com et en telechargement libre sur lequel la société ATALIA- ALLO SANTE EXPRESS propose des services de mise en relation entre utilisateurs et professionnels de santé.
« ATALIA-ALLO SANTE EXPRESS » ou « la société » : société proposant une offre de mise en relation d’utilisateurs et de professionnels de santé .
« vous » ou « utilisateur » : utilisateur ou membre de la plateforme ATALIA-ALLO SANTE EXPRESS
« professionnel de santé » : prestataires tiers independants effectuants des soins ,consultations.</Text>
                    <Text style={styles.titl}>ARTICLE 1 : PROPRIETE DU SITE – ACCEPTATION DES CONDITIONS D’UTILISATION </Text>
                    <Text style={styles.titleT}>Les présentes conditions générales ont pour objet de décrire les conditions auxquelles l’utlisateur adhérent sans réserve en utlisant les plateformes.
Ces conditions répresentent un accord contraignant entre vous et ATALIA – ALLO SANTE EXPRESS. Vous acceptez ces conditions chaque foIs que vous accedez au site  D’ATALIA- ALLO SANTE EXPRESS ou utilisez les services D’ATALIA – ALLO SANTE EXPRESS .
ATALIA-ALLO SANTE EXPRESS  est une plateforme technologique permettant aux utilisateurs  une application mobile ou un site web D’ATALIA- ALLO SANTE EXPRESS, qui sont fournis dans le cadre des services ,de prise de rendez-vous,d’assistance médicale,livraison de medicament,assurance en ligne avec des prestataires tiers independants desdits services
Sauf disposition contraire D’ATALIA-ALLO SANTE EXPRESS dans un accord écrit distinct établi avec l’utilisateur , les services sont mis à sa disposition pour une utilisation exclusivement personnelle et non commerciale.


EN UTILISANT LE SITE OU L’APPLICATION MOBILE  , VOUS ACCEPTEZ LES PRESENTES CONDITIONS D’UTILISATION .
Vous comprenez et acceptez qu’ATALIA-ALLO SANTE EXPRESS ne soit partie à aucun accord passé avec les utilisateurs,qu’elle n’a pas la qualité de professionnel de santé.
ATALIA – ALLO SANTE EXPRESS n’exerce aucun contrôle concernant le comportement des utilisateurs du site ou de l’application mobile.
SI VOUS N’ACCEPETEZ PAS LES PRESENTES CONDITIONS D’UTILISATION ,VEUILLEZ NE PAS UTILISER LA PLATEFORME

ATALIA-ALLO SANTE EXPRESS se réserve le droit, à sa seule discrétion et à tout moment, de changer, modifier, compléter ou supprimer des parties de ces Conditions Générales. Il est de votre responsabilité de consulter périodiquement ces Conditions Générales pour voir si des modifications y ont été apportées. Si vous continuez à utiliser le Site après publication des modifications apportées, cela signifiera que vous acceptez lesdites modifications. Tant que vous vous conformez aux présentes Conditions Générales, ATALIA-ALLO SANTE EXPRESS vous accorde un droit personnel limité, non exclusif et non cessible d'accès au Site et d'utilisation du Site.
Si des utilisateurs violent ces conditions, ATALIA-ALLO SANTE EXPRESS  peut suspendre pour un temps ou mettre fin à leur accès.</Text>
                    <Text style={styles.titl}>ARTICLE 2 – ACCES ET FONCTIONNEMENT DU SITE</Text>
                    <Text style={styles.tit}>2.1 Accès au Site</Text>
                    <Text style={styles.titleT}>«ATALIA-ALLO SANTE EXPRESS » étant proposé sur Internet, pour y accéder, Visiteur, Utilisateur et Membre doivent avoir une connexion Internet. Tous les coûts des connexions téléphoniques et d'accès à Internet sont à leur charge. ATALIA-ALLO SANTE EXPRESS ne met, à la disposition de l’utilisateur, aucun moyen matériel, notamment installation téléphonique, équipement terminal, logiciel ou abonnement, pour se connecter au site. 
ATALIA-ALLO SANTE EXPRESS n’accorde à l’utilisateur qu'une licence limitée, non exclusive et non transférable d'accès et d'utilisation du Service et de son contenu. Cette licence est soumise au respect des règles prévues par les présentes Conditions Générales.
Pour accéder au Service, l’utilisateur doit créer un compte sur l’application ALLO SANTE EXPRESS à télécharger sur son téléphone (version iOS ou Androïd).
ATALIA-ALLO SANTE EXPRESS est libre à tout moment d’interrompre ou de suspendre l’accès à tout ou partie du site ou des services, notamment pour des raisons opérationnelles ou de maintenance, de modifier, suspendre, supprimer le site et mettre fin à sa publication sur le réseau Internet sans que les utilisateurs puissent prétendre à une quelconque indemnité.</Text>
                    <Text style={styles.tit}>2.2 Fonctionnement du site</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS ne garantit pas que le fonctionnement du site soit continu et sans erreur.
ATALIA-ALLO SANTE EXPRESS ne pourra être tenue responsable de l’indisponibilité, de l’interruption ou du dysfonctionnement du site, pour quelque raison que ce soit et notamment en cas de défaillance de son fournisseur d’accès internet, de son hébergeur, intrusion de tiers ou force majeure.
ATALIA- ALLO SANTE EXPRESS ne pourra être tenue responsable des inconvénients ou dommages inhérents à l’utilisation du réseau internet, tels que notamment présence de virus informatiques ou spywares.</Text>
                    <Text style={styles.titl}>ARTICLE 3 - INSCRIPTION ET CREATION DE COMPTE</Text>
                    <Text style={styles.tit}>3.1 Caractéristiques</Text>
                    <Text style={styles.titleT}>Pour créer un Compte, vous devez être une personne physique, âgée de dix-huit (18) ans ou ayant atteint l'âge légal dans votre pays de résidence ou avoir obtenu l'accord de votre représentant légal (parent ou tuteur) si vous êtes mineur ou si vous êtes sous tutelle ou sous curatelle.
Le Compte est un compte utilisateur mis à votre disposition via un nom de Compte et un mot de passe.
Le Compte reste la propriété d’ATALIA- ALLO SANTE EXPRESS. Vous n'êtes titulaire que d'un droit d'accès au Service, par l'intermédiaire d'un Compte mis à votre disposition.
La gestion du Compte et des informations personnelles se fait uniquement sur l’application mobile ALLO SANTE EXPRESS.
Le nom de Compte (ou login) et le mot de passe vous permettent d'accéder au Service.
Le Compte doit respecter au minimum les règles suivantes :</Text>
                    <Text style={styles.ti}>• les informations personnelles doivent être exactes, vérifiables, complètes et à jour une adresse email personnelle et valide doit être renseignée.</Text>
                    <Text style={styles.ti}>• les connexions au Compte (horaires, pays, fournisseur d'accès Internet, interdiction des proxys) doivent correspondre à une utilisation normale d'un Compte Utilisateur.</Text>
                    <Text style={styles.tit}>3.2 Règles de création</Text>
                    <Text style={styles.titleT}>Le nom de Compte ou login doit respecter au minimum les règles suivantes :</Text>
                    <Text style={styles.ti}>• Correspondre à un mot prononçable (par exemple le mot CFCYTC ne respecte pas cette règle)</Text>
                    <Text style={styles.ti}>• Ne pas faire référence à une orientation politique, à une ethnie, une communauté, une religion</Text>
                    <Text style={styles.ti}>• Ne pas être vulgaire ou insultant</Text>
                    <Text style={styles.ti}>• Ne pas avoir de connotation sexuelle voire pornographique</Text>
                    <Text style={styles.ti}>• Ne pas ressembler ou imiter une marque déposée</Text>
                    <Text style={styles.ti}>• Ne pas faire référence à un produit stupéfiant ou toute autre entité interdite par la législation</Text>
                    <Text style={styles.ti}>• Ne pas ressembler ou imiter les noms de personnages crées par un des auteurs en ligne</Text>
                    <Text style={styles.ti}>• Ne pas ressembler ou imiter le nom d'un membre de la Société</Text>
                    <Text style={styles.ti}>• Ne pas être orthographié ou épelé alternativement dans le but de contourner les règles imposées ci-dessus</Text>
                    <Text style={styles.tit}>3.3 Sécurité</Text>
                    <Text style={styles.titleT}>Pour garantir la sécurité de votre Compte et éviter ainsi le vol de Compte communément appelé le « hack de Compte », vous vous engagez à :</Text>
                    <Text style={styles.ti}>• Ne pas donner accès à votre Compte à un tiers. Le prêt, le partage, l'échange, le don, l'achat, le transfert et la vente de Compte sont interdits. Tout prêt, partage, échange, don, achat, transfert ou vente de Compte ne sera pas opposable à ATALIA-ALLO SANTE EXPRESS ;</Text>
                    <Text style={styles.ti}>• Prendre toutes les mesures afin d'éviter qu'un tiers puisse accéder au Compte que vous avez activé, même à votre insu ;</Text>
                    <Text style={styles.ti}>• Ne pas utiliser le Compte d'un tiers ;</Text>
                    <Text style={styles.ti}>• Ne pas diffuser vos identifiants, à savoir le nom de compte (login) et le mot de passe ;</Text>
                    <Text style={styles.ti}>• Utiliser une boîte email personnelle et ne pas partager cet email ;</Text>
                    <Text style={styles.ti}>• Ce qu’ ATALIA-ALLO SANTE EXPRESS puisse facilement entrer en contact avec vous, pour quelque raison que ce soit, via votre adresse email.</Text>
                    <Text style={styles.tit}>3.4 Responsabilité</Text>
                    <Text style={styles.titleT}>La sécurité de votre Compte est de votre seule responsabilité. ATALIA-ALLO SANTE EXPRESS ne pourra pas être tenue pour responsable des dommages que pourrait subir votre Compte ou votre ordinateur suite à la perte ou au partage des identifiants de votre Compte.
ATALIA-ALLO SANTE EXPRESS ne pourra en aucune manière être reconnue responsable en cas de vol de compte ou de toutes altérations que pourra subir votre Compte.
Vous reconnaissez également que vous êtes présumé être l'utilisateur de votre Compte et le responsable des actions entreprises via votre Compte et sur votre Compte.
Vous reconnaissez que vous, et non pas ATALIA-ALLO SANTE EXPRESS, êtes responsable de toutes les communications électroniques et des contenus envoyés par vos soins et que vous devez utiliser le Service dans le respect des lois applicables.
Vous comprenez et acceptez qu’ATALIA-ALLO SANTE EXPRESS n'exerce aucun contrôle concernant le comportement des Utilisateurs du site, de l'application et des services et ATALIA-ALLO SANTE EXPRESS exclut toute responsabilité à ce titre dans les limites autorisées par la loi.</Text>
                    <Text style={styles.titl}>ARTICLE 4 – PRESENTATION DU SERVICE ATALIA-ALLO SANTE EXPRESS ET ENGAGEMENTS D’ATALIA-ALLO SANTE EXPRESS</Text>
                    <Text style={styles.tit}>4.1 Service ATALIA-ALLO SANTE EXPRESS</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS est un intermédiaire  dont le rôle est de mettre en relation au moyen du site Internet et de l’application ATALIA-ALLO SANTE EXPRESS des personnes souhaitant utiliser des services de santé
ATALIA-ALLO SANTE EXPRESS propose au Client la possibilité après création d’un compte personnel sur la plateforme :
1. de prendre rendez-vous chez un professionnel de santé.
2. D’avoir une assistance médicale à domicile à l’adresse qu’il aura indiqué à l’inscription
3. de souscrire à des polices d’assurance en ligne
- scanner sa carte grise
-scanner son passeport
4. de ce faire livrer des médicaments à domicile</Text>
                    <Text style={styles.tit}>4.2 CHARTE DE CONFORMITE, DE QUALITE DE SERVICE ET D’INDEPENDANCE</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS sélectionne des professionnels de santé ayant la capacité juridique de proposer leurs services en respectant l’intégrité des Utilisateurs, leur vie privée et leur intégrité.
ATALIA-ALLO SANTE EXPRESS travaille avec l'ensemble des professionnels de santé partenaires sélectionnées. ATALIA-ALLO SANTE EXPRESS n'intervient donc pas dans le conseil et dans une mise en relation orientée vers un pharmacien pour la livraison de produits pharmaceutiques en particulier et préserve ainsi le libre choix du Client.
ATALIA-ALLO SANTE EXPRESS fait aussi appel à une plateforme de paiement agréée et sécurisée externe (la Sté,VISA, MTN MONEY, ORANGE MONEY ET MOOV MONEY) pour faciliter les paiements.
ATALIA-ALLO SANTE EXPRESS met à disposition sur son site le contenu complet de sa Charte de conformité.</Text>
                    <Text style={styles.tit}>4.3 Disponibilité des services</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS propose actuellement son service de pharmacie de garde dans plusieurs pays autres que la côte d’ivoire  mais ne peut pas traiter les demandes de personnes(prise de rendez-vous, assistance médicale, prix des médicaments, livraison de médicaments) dont l’indicatif du pays  est celui d'un pays autre que la côte d’ivoire où ATALIA-ALLO SANTE EXPRESS n'a aucun partenaire professionnel de santé
Vous êtes informés que les heures d'ouverture varient en fonction des établissements de santé.</Text>
                    <Text style={styles.titl}>ARTICLE 5 - MODALITES DE REGLEMENT</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS est entièrement gratuit pour les Utilisateurs. Aucun frais de gestion sous quelque forme ou de quelque nature que ce soit ne s’applique aux Utilisateurs.
Vous reconnaissez et acceptez que ATALIA-ALLO SANTE EXPRESS ne soit en aucun cas responsable des paiements effectués frauduleusement sur son Site, et ce, peu importe le moyen de paiement utilisé.
S'il s'avère que vous avez effectué un paiement frauduleux, c'est-à-dire sans le consentement du titulaire du moyen de paiement, la Société se réserve le droit de bannir définitivement votre Compte et engager les poursuites judiciaires qui s'imposent à votre encontre.
De même, si vous avez communiqué vos identifiants à un tiers qui réalisera un paiement frauduleux, ATALIA-ALLO SANTE EXPRESS pourra alors prendre les mêmes sanctions vis-à-vis de vous.</Text>
                    <Text style={styles.titl}>ARTICLE 6 - OBLIGATIONS GENERALES DE L’UTILISATEUR</Text>
                    <Text style={styles.titleT}>Vous n'êtes pas autorisé à utiliser des dispositifs, programmes, algorithmes ou autres méthodes automatiques de type « lien profond », « gratte-pages », « robot » ou « araignée », ou tout autre processus manuel similaire ou équivalent, pour accéder à, acquérir, copier ou surveiller toute partie du Site ou du Contenu, ni à reproduire ou contourner la structure navigationnelle ou la présentation du Site ou du Contenu pour vous procurer ou essayer de vous procurer des données, des documents ou des informations par des moyens non mis à dessein à votre disposition par le biais du Site. ATALIA-ALLO SANTE EXPRESS se réserve le droit d'interdire ce type d'activité.

Vous ne devez pas essayer d'accéder de façon illicite à toute section ou fonctionnalité du Site, ni à tout autre système ou réseau connecté au Site ou à un serveur ATALIA-ALLO SANTE EXPRESS, ni aux services offerts sur ou par l'intermédiaire du Site, par piratage informatique, « reniflage » de mots de passe ou tout autre moyen illégitime.
Vous ne devez pas essayer de sonder, d'analyser ou de tester la vulnérabilité du Site ou de tout réseau connecté au Site, ni enfreindre les mesures de sécurité et d'authentification mises en place sur le Site ou les réseaux connectés au Site. Vous n'êtes pas autorisé à rétro-interroger, tracer ou essayer de tracer les informations sur les autres utilisateurs ou visiteurs du Site, ou les autres clients d’ ATALIA-ALLO SANTE EXPRESS , notamment tout compte ATALIA-ALLO SANTE EXPRESS dont vous n'êtes pas le détenteur ou sa source, ni à exploiter le Site ou les services ou les informations mis à disposition ou offerts sur ou via le Site, de quelque manière que ce soit, dans le but de révéler ces informations, notamment les informations d'identification personnelles ou les informations autres que vos propres informations, telles qu'elles apparaissent sur le Site.
Vous vous engagez à ne prendre aucune mesure qui imposerait une charge excessive ou déraisonnable sur l'infrastructure du Site ou des systèmes ou des réseaux d’ATALIA-ALLO SANTE EXPRESS, ou de tout système ou réseau connecté au Site ou à ATALIA-ALLO SANTE EXPRESS .
Vous vous engagez à n'utiliser aucun dispositif, logiciel ou sous-programme pour interférer ou essayer d'interférer sur le bon fonctionnement du Site ou de toute transaction conduite sur le Site ou sur l'utilisation du Site par toute autre personne.
Vous ne devez pas essayer de contrefaire les en-têtes ou manipuler les identifiants de quelque manière que ce soit pour déguiser l'origine d'un message ou d'une transmission envoyé à sur ou via le Site, ou d'un service offert sur ou via le Site. Vous ne devez pas prétendre être ou représenter quelqu'un d'autre, ni vous faire passer pour une autre entité physique ou morale.
Vous ne devez pas utiliser le Site ou son Contenu dans un dessein illicite ou prohibé par les présentes Conditions Générales, ni en vue d'encourager toute activité illégale ou autre portant atteinte aux droits d’ATALIA-ALLO SANTE EXPRESS ou de tiers.</Text>
                    <Text style={styles.titl}>ARTICLE 7 - OBLIGATIONS DE L’UTILISATEUR EN TERMES DE CONTENUS</Text>
                    <Text style={styles.titleT}>L'utilisateur s'engage, préalablement à l'enregistrement de son compte, à effectuer les déclarations et obtenir les autorisations nécessaires éventuelles dans les conditions prévues par la loi.
Il est rappelé que seul l’utilisateur est responsable du contenu qu’il diffuse sur Internet et dans son espace dédié, en aucun cas ATALIA-ALLO SANTE EXPRESS ne saurait être considérée comme responsable du contenu créé par l'utilisateur. L’utilisateur s'engage à ce que ses contenus ne portent pas atteinte aux droits des tiers, et notamment :</Text>
                    <Text style={styles.tit}>7.1 Contenus manifestement illicites</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas inciter à la haine, à la violence, à l'anorexie, à la fabrication et utilisation d'explosifs, au suicide, au racisme, à l'antisémitisme, à la xénophobie, à l’homophobie, faire l'apologie des crimes de guerre ou des crimes contre l'humanité ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l'utilisateur ne doit présenter en aucun cas un caractère pédophile ou pédo-pornographique ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas inciter à commettre un crime, un délit ou un acte de terrorisme ou encore à encourager le suicide ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas inciter à la discrimination d'une personne ou d'un groupe de personne en raison de son appartenance à une ethnie, à une religion, à une race ou du fait de son orientation sexuelle ou de son handicap.</Text>
                    <Text style={styles.titleT}>Dans le cadre de ses obligations de surveillance sur les contenus manifestement illicites, édictées par la loi du 21 janvier 2004 pour la confiance en l'économie numérique, ATALIA-ALLO SANTE EXPRESS pourra être amenée à consulter une copie des informations envoyés par l’utilisateur via son inscription sur le site web ou sur l’application.</Text>
                    <Text style={styles.tit}>7.2 Contenus litigieux</Text>
                    <Text style={styles.titleT}>L'utilisateur s'engage à prendre connaissance avant toute publication des règles et limites relatives à la liberté d'expression. La liberté d'expression autorise la critique, le rapport d'informations vérifiées et prouvées, elle n'autorise pas le dénigrement et la diffamation. Tout dénigrement, diffamation ou allégation d'informations inexactes ou volontairement tronquées pour en changer le sens peuvent entraîner des poursuites à l'encontre de leur auteur.</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas porter atteinte ou être contraire à l'ordre public, aux bonnes mœurs ou pouvoir heurter la sensibilité des mineurs ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas présenter de caractère pornographique ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas porter atteinte aux droits à la réputation, à la vie privée de tiers et à l'image ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas être, au strict sens de la loi, dénigrant ou diffamatoire.</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas porter atteinte à l'image, à la réputation d'une marque ou d'une quelconque personne physique ou morale ;</Text>
                    <Text style={styles.ti}>• La liberté d'expression autorise la critique dès lors qu'elle est objective, argumentée, et portant sur des faits réels.</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas porter atteinte à la sécurité ou à l'intégrité d'un État ou d'un territoire, quel qu'il soit ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas permettre à des tiers de se procurer des logiciels piratés, des numéros de série de logiciels ou tout logiciel pouvant nuire ou porter atteinte, de quelque manière que ce soit, aux droits ou aux biens des tiers ;</Text>
                    <Text style={styles.ti}>• Le contenu publié par l’utilisateur ne doit pas porter atteinte aux droits de propriété intellectuelle de quelque personne physique ou morale que ce soit.</Text>
                    <Text style={styles.titl}>ARTICLE 8 - PROPRIETE INTELLECTUELLE - MARQUES</Text>
                    <Text style={styles.titleT}>L'ensemble des textes, graphiques, interfaces utilisateur, interfaces visuelles, photographies, marques commerciales, logos, sons, musiques, illustrations et codes informatiques (collectivement désignés par le terme le « Contenu »), notamment le design, la structure, la sélection, la coordination, l'expression, l'aspect et la convivialité, la présentation et l'agencement de ce Contenu, figurant sur le Site est détenu, contrôlé ou cédé sous licence par ou à ATALIA-ALLO SANTE EXPRESS , et est protégé par la législation sur l'habillage commercial, les droits d'auteur, les brevets et les marques, et diverses autres lois applicables en matière de propriété intellectuelle et de concurrence déloyale.
Sauf mention expresse figurant dans les présentes Conditions Générales, aucune section du Site ni aucun Contenu ne peuvent être copiés, reproduits, republiés, téléchargés, publiés, exposés en public, encodés, traduits, transmis ou diffusés de quelque façon que ce soit (y compris par « écriture miroir ») sur un autre ordinateur, serveur, site web ou support de publication ou de diffusion, ou pour quelque entreprise commerciale que ce soit, sans l'accord écrit préalable d’ ATALIA-ALLO SANTE EXPRESS
Vous pouvez utiliser les informations sur les produits et les services ATALIA-ALLO SANTE EXPRESS (telles que les fiches techniques, les articles de la base de connaissances et informations similaires) mis à disposition à dessein par ATALIA-ALLO SANTE EXPRESS en vue de leur téléchargement, dans la mesure où (1) vous ne supprimez pas les avis de droits d'auteur sur les copies de ces documents, (2) vous utilisez ces informations pour votre usage personnel et à des fins non commerciales et vous ne copiez pas et ne publiez pas ces informations sur un ordinateur en réseau et vous ne les diffusez pas dans quelque média que ce soit, (3) vous n'apportez pas de modifications à ces informations et (4) vous n'accordez aucun engagement ni aucune garantie quant à la teneur de ces documents.</Text>
                    <Text style={styles.titl}>ARTICLE 9 - COMMERCE - PUBLICITE</Text>
                    <Text style={styles.titleT}>Il est interdit à toute personne physique ou morale de contacter un ou plusieurs membres afin de lui proposer une rémunération ou une quelconque récompense en échange d'une prestation publicitaire sur son espace personnel en tant que membre; toute demande de ce type ne peut se faire qu'avec l'accord express de la société.
L’utilisateur ne doit en aucun cas proposer la vente, le don ou l'échange de biens volés ou issus d'un détournement, d'une escroquerie, d'un abus de confiance ou de toute autre infraction pénale ; toute personne détectant ou suspectant que des ventes faites par un utilisateur ne sont pas régulières doit en informer immédiatement l'équipe d’ATALIA-ALLO SANTE EXPRESS, par l'intermédiaire des formulaires contact/signaler un abus présent sur le site.
L'utilisateur s'engage à ne conclure en aucun cas le moindre accord avec une régie publicitaire non affiliée à ou partenaire d’ATALIA-ALLO SANTE EXPRESS ; l'utilisateur s'engage à ne pas mettre de matériel à caractère publicitaire (en particulier sans s'y limiter : texte, image, vidéo, lien) émanant/ proposé par une régie publicitaire non affiliée à ou partenaire de la société. L'utilisateur s'engage à ne pas inclure sur son espace personnel sous quelque forme que ce soit, une ou plusieurs annonce(s) faisant la publicité ou la promotion, de quelque manière que ce soit, d'un Site internet ou d'une société exerçant une activité concurrente à celle ATALIA-ALLO SANTE EXPRESS.

L'utilisateur se déclare averti que tout matériel publicitaire fourni par une régie publicitaire externe non affiliée ou partenaire d’ATALIA-ALLO SANTE EXPRESS, ainsi que toute publicité qui serait considérée comme abusive par ATALIA-ALLO SANTE EXPRESS pourra être supprimée ou remplacée par ATALIA-ALLO SANTE EXPRESS dès lors qu'elle sera avertie de son existence.
L'utilisateur autorise ATALIA-ALLO SANTE EXPRESS à référencer son espace de quelque manière que ce soit et par tout moyen de communication, notamment par l'insertion de liens à partir de son espace, de son profil ou dans les outils d'indexation du Site www.ALLOSANTEEXPRESS.COM. ATALIA-ALLO SANTE EXPRESS ne peut être considérée comme responsable des dommages liés à ce référencement.</Text>
                    <Text style={styles.titl}>ARTICLE 10 - RESPONSABILITE ET GARANTIE</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS propose une plateforme ou une place de marché en ligne dotée d'une technologie adaptée permettant aux Utilisateurs et aux Professionnels de santé de se rencontrer en ligne et d'organiser des prestations de services.
L'utilisation du site, de l'application et des services est destinée à faciliter la mise en relation des utilisateurs et des Professionnels de santé . 
ATALIA-ALLO SANTE EXPRESS mettra tout en œuvre pour assurer le bon fonctionnement du Service et vous fournir le Service 24h/24, 7 jours/7.
Néanmoins ATALIA-ALLO SANTE EXPRESS n'a qu'une obligation de moyen concernant l'accès et l'utilisation du Service. 
ATALIA-ALLO SANTE EXPRESS ne peut pas garantir que les fonctions proposées par le Service seront toujours disponibles ou sans erreurs typographiques, techniques ou autres, que les défauts seront corrigés ou que les Services ou serveurs qui l'hébergent sont exempts de virus ou de bugs.
Pour des motifs de maintenance, de test, de réparation ou de toute autre nature liés à l'amélioration et au fonctionnement du Service, celui-ci pourra être interrompu temporairement par ATALIA-ALLO SANTE EXPRESS, sans que sa responsabilité ne puisse être engagée. ATALIA-ALLO SANTE EXPRESS décidera seule de vous accorder ou non une compensation en cas d'interruption du Service.
La responsabilité ATALIA-ALLO SANTE EXPRESS ne saurait être engagée dans les cas de force majeure prévus par la loi et telle que définie par la jurisprudence des cours et tribunaux y compris l'interruption, la suspension, la réduction ou les dérangements de l'électricité ou autres ou toutes interruptions de réseaux de télécommunications.
Par ailleurs ATALIA-ALLO SANTE EXPRESS ne peut être considérée comme responsable du contenu des Sites ou pages personnelles de l'utilisateur (sites, blogs personnels de l’utilisateur dont l’accès s’effectue en externe ou interne à ATALIA-ALLO SANTE EXPRESS. L’utilisateur accepte et reconnaît qu'il est seul responsable des informations, textes, images, vidéos, données, fichiers, programmes contenus dans son espace personnel ou sur sa page personnelle.
L'utilisateur accepte de faire son affaire personnelle et de dégager ATALIA-ALLO SANTE EXPRESS de toute responsabilité, perte, réclamation, litige, dommage ou dépense, y compris les frais de justice et de défense, revendiqués par un tiers ou par un autre utilisateur du fait de son espace personnel ou de sa page personnelle.
ATALIA-ALLO SANTE EXPRESS est tenue à une obligation de moyens dans le cadre des présentes Conditions Générales et ne saurait en aucun cas être responsable de toute perte, préjudice ou dommage indirect de quelque nature que ce soit résultant de la gestion, l'utilisation, l'exploitation, d'une interruption ou d'un dysfonctionnement du service.
ATALIA-ALLO SANTE EXPRESS ne peut être considérée comme responsable du contenu des Sites extérieurs, du fonctionnement de l'accès à ces Sites. ATALIA-ALLO SANTE EXPRESS n'approuve pas et n'est pas responsable du contenu, des idées, des opinions, des produits ou services vendus sur ces Sites extérieurs.
L’utilisateur reconnaît être seul responsable des liens hypertextes et adresses Internet qu'il inclut sur son Site ou sa page personnelle et garantit la société, ses filiales, dirigeants, agents et employés contre tout litige ou toute réclamation relative à ces liens.
ATALIA-ALLO SANTE EXPRESS ne garantit pas contre et ne peut être considérée comme responsable de la perte ou de l'altération des fichiers ou données que l'utilisateur transfère sur son Site (même question qu’au-dessus).
L'utilisateur accepte de transférer ces données et fichiers sous sa seule responsabilité et en connaissance de cause. Il incombe à l'utilisateur d'effectuer toute mesure de sauvegarde qui lui semblera nécessaire.
ATALIA-ALLO SANTE EXPRESS ne garantit pas une fréquentation minimum de l’espace de l'utilisateur et ne garantit pas non plus la réalisation d'un quelconque chiffre d'affaire ou bénéfice par le membre utilisateur.
ATALIA-ALLO SANTE EXPRESS ne peut notamment être considérée comme responsable :</Text>
                    <Text style={styles.ti}>• du mauvais fonctionnement, de la discontinuité ou de la mauvaise qualité des services proposés sur le site de l'utilisateur ;</Text>
                    <Text style={styles.ti}>• de la non-conclusion ou de tout litige dans la conclusion ou l'exécution d'un contrat proposé sur le site de l'utilisateur;</Text>
                    <Text style={styles.ti}>• des vices cachés, de la conformité, de la légalité ou de la dangerosité des biens et services proposés sur l’espace dédié de l'utilisateur ;</Text>
                    <Text style={styles.ti}>• des mensonges, exagérations, vols, violences, réticences dolosives commises par l'utilisateur.</Text>
                    <Text style={styles.titl}>ARTICLE 11 - INFORMATIONS PERSONNELLES - POLITIQUE DE CONFIDENTIALITE</Text>
                    <Text style={styles.titleT}>Tous nos traitements de données à caractère personnel sont mis en œuvre dans le respect de notre Politique des données clients / contacts accessible ici.
ATALIA- ALLO SANTE EXPRESS s'engage à ne pas communiquer vos informations à des tiers et à tout mettre en œuvre pour empêcher la diffusion de celles-ci, sauf autorisation expresse de votre part. ATALIA-ALLO SANTE EXPRESS se réserve le droit de poursuivre toute personne qui tenterait d'accéder à des informations personnelles qui ne la concernerait pas 
ATALIA-ALLO SANTE EXPRESS n'a aucune obligation de fournir des informations liées à un Compte spécifique, même si un utilisateur le demande, sauf aux autorités compétentes dans le cadre d'une enquête judiciaire.
A la clôture du compte et à toutes fins de preuve, des données concernant l'utilisateur pourront néanmoins être conservées.
Par ailleurs et afin d'améliorer la qualité de son service et de mieux répondre aux attentes de ses utilisateurs, ATALIA-ALLO SANTE EXPRESS pourra être amené à collecter des données nominatives sur l'utilisateur, notamment par l'utilisation de marqueurs (cookies). L'acception de ces cookies est obligatoire pour toute souscription d'abonnement.
ATALIA-ALLO SANTE EXPRESS se réserve également le droit de collecter certaines informations : - liées à votre ordinateur (IP, fournisseur d'accès, configuration matérielle, configuration logicielle) - liées au service (log et historique de tous les échanges de données, log et historique des connexions).</Text>
                    <Text style={styles.titl}>ARTICLE 12 - SANCTIONS</Text>
                    <Text style={styles.titleT}>En cas de violation d'une ou de plusieurs dispositions des présentes Conditions Générales, du contrat d’abonnement en tant que membre, ou de tout autre document rédigé par ATALIA-ALLO SANTE EXPRESS, celle-ci se réserve le droit de mettre fin ou restreindre sans aucun avertissement préalable et à sa seule discrétion, votre usage et accès au Service, à votre Compte et à tous les autres plateformes d’ATALIA-ALLO SANTE EXPRESS.
Les sanctions sont fonction de la gravité de la violation. Elles pourront consister, de manière non limitative, en les actions suivantes :</Text>
                    <Text style={styles.ti}>• L'avertissement : L'avertissement n'a pas de conséquence directe sur le Compte. Vous pourrez continuer à utiliser le service sans changement. Il est là avant tout pour vous avertir que vous risquez des sanctions plus importantes si vous continuez d'enfreindre les règles d’ATALIA-ALLO SANTE EXPRESS.</Text>
                    <Text style={styles.ti}>• La suspension de (3) jours : La suspension de trois jours est généralement utilisée en cas de premier manquement notable aux règles de la Société. Il s'agit du premier palier applicable dans l'échelle des suspensions de Compte.</Text>
                    <Text style={styles.ti}>• La suspension définitive : Le Compte est fermé définitivement, vous ne pouvez plus y accéder. Cette sanction est généralement appliquée dans les cas de récidives ou de manquement grave ou impardonnable aux règles d’ATALIA-ALLO SANTE EXPRESS.</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS se réserve le droit d'appliquer n'importe quelle sanction à un Compte, compte tenu de la gravité de la violation, sans obligatoirement avertir ou appliquer une sanction de durée moindre au préalable. Vous acceptez que ces sanctions soient sans appel et que vous ne pourrez en aucun cas contester les décisions prises par ATALIA-ALLO SANTE EXPRESS.
En plus des sanctions décrites ci-dessus, ATALIA-ALLO SANTE EXPRESS pourra prendre les sanctions qui s'imposent, et notamment engager des poursuites civiles et pénales contre le contrevenant.
Sauf mention contraire dans les présentes Conditions Générales ou accord exceptionnel d’ATALIA-ALLO SANTE EXPRESS, il ne sera procédé à aucun remboursement si le Compte est annulé avant la fin de la période d'abonnement.</Text>
                    <Text style={styles.titl}>ARTICLE 13 - MODIFICATION DES CONDITIONS GENERALES – CONDITIONS PARTICULIERES</Text>
                    <Text style={styles.tit}>13.1 Modifications</Text>
                    <Text style={styles.titleT}>ATALIA-ALLO SANTE EXPRESS se réserve le droit de modifier les conditions générales à tout moment.
Chaque modification prendra effet à compter de sa mise en ligne sur le site. ATALIA-ALLO SANTE EXPRESS s’engage à informer préalablement les membres par courrier électronique ou par affichage sur le site ou sur l’application mobile. En cas de refus de la modification, l’utilisateur ne devra plus utiliser le site ou les services concernés par la modification et son compte pourra être supprimé sans qu’il puisse prétendre à une quelconque indemnité. Toute utilisation du site après la mise en ligne de la modification vaut acceptation de ladite modification.</Text>
                    <Text style={styles.tit}>13.2 Services</Text>
                    <Text style={styles.titleT}>Chaque service peut être soumis à des conditions particulières.
ATALIA-ALLO SANTE EXPRESS est libre d’ajouter et de supprimer des services du site et/ou de modifier leurs caractéristiques, conditions d’utilisation et autres conditions particulières. Elle en informera les membres par courrier électronique ou affichage sur le site ou sur l’application mobile.
L’utilisateur peut être amené, dans le cadre de l’utilisation du site ou par son intermédiaire, à utiliser des services ou accéder à des contenus fournis par des tiers. ATALIA-ALLO SANTE EXPRESS décline toute responsabilité quant aux dits services et contenus, auxquels elle est étrangère, le tiers fournisseur du service ou du contenu étant seul responsable à l’égard de l’utilisateur.
ATALIA-ALLO SANTE EXPRESS ne peut en aucun cas être tenu responsable d’un quelconque dommage survenu dans le cadre d’échanges réalisés en dehors du site, même entre membres.</Text>
                    <Text style={styles.titl}>ARTICLE 14 - ACHATS - AUTRES CONDITIONS GENERALES</Text>
                    <Text style={styles.titleT}>Des conditions générales annexes pourront s'appliquer à des achats de biens ou de services, ainsi qu'à des sections ou fonctionnalités spécifiques du Site ou de l’Application mobile, notamment les concours, promotions et autres offres similaires, lesdites conditions étant intégrées aux présentes Conditions Générales à titre de référence. Vous acceptez de vous conformer à ces conditions générales annexes. En cas de contradiction entre les présentes Conditions Générales et les conditions publiées pour, ou applicables à une section spécifique du Site ou pour un service offert sur ou via le Site, ces dernières conditions prévaudront et régiront l'utilisation de cette section du Site ou de ce service spécifique.
Le cas échéant, les obligations d’ATALIA-ALLO SANTE EXPRESS vis-à-vis de ses produits et services sont régies uniquement par les conventions aux termes desquelles elles ont été définies et aucun élément figurant sur ce Site ne saurait être interprété de façon à modifier ces conventions.
ATALIA-ALLO SANTE EXPRESS pourra apporter des changements aux produits et services offerts sur le Site ou aux prix applicables à ces produits et services à tout moment et sans préavis. Les informations publiées sur le Site concernant des produits et des services peuvent être obsolètes, et ATALIA-ALLO SANTE EXPRESS ne s'engage nullement à mettre à jour les informations publiées sur le Site relatives à ces produits et services.</Text>
                    <Text style={styles.titl}>ARTICLE 15 - DROIT APPLICABLE – JURIDICTION COMPETENTE</Text>
                    <Text style={styles.titleT}>Les présentes Conditions Générales sont régies par la Loi et la langue française.
En cas de litiges ou de réclamations émanant de l'utilisateur, d’ ATALIA-ALLO SANTE EXPRESS ou d'un tiers, relatifs à l'utilisation du service, seule la version des présentes Conditions Générales accessible sur le Site www.ALLOSANTEEXPRESS.COM aura force obligatoire entre les parties, quelle que soit la date des faits litigieux.
A défaut de solution amiable, tout litige susceptible de s’élever entre les parties à propos de la formation, de l’exécution, de l’interprétation ou de la résiliation-résolution du Contrat sera de la compétence exclusive des tribunaux compétents d’Abidjan et ce y compris en cas de référé, de requête ou de pluralité de défendeurs.
Conditions générales Version 1
01/10/2019
ASSURANCE EN LIGNE</Text>








                    </ScrollView>
                    
                   </View>
            )
        }
        else{
            return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color="#4dbcc7" />
            </View>)
        }
    }
    }


    const styles = StyleSheet.create({
        padding:{
            paddingLeft:5,
            paddingRight:5,
        },
        
        title:{
            fontFamily:"LexendExa",
            fontSize: 19,
            marginLeft:5,
            marginBottom:7,
            color:"#4dbcc7",
        },
        app:{
            fontFamily:"LexendExa",
            fontSize: 20,
            textAlign:"center",
            margin:3,
            fontWeight:"100"
        },
        titleT:{
            fontFamily:"LexendExa",
            fontSize: 15,
            marginLeft:7,
            marginBottom:9,

            color:"#555555",
        },
        titl:{
            fontFamily:"LexendExa",
            fontSize: 17,
            marginLeft:5,
            marginBottom:7,
        },
        tit:{
            fontFamily:"LexendExa",
            fontSize: 16,
            marginLeft:5,
            marginBottom:7,
            color:"#444444",
        },
        ti:{
            fontFamily:"LexendExa",
            fontSize: 14,
            marginLeft:10,
            marginBottom:2,
            color:"#777777",
        },
        
    })