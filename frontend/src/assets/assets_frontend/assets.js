import banner_img from './banner.png'
import header_img from './header-img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo-czy.png'
// import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './cook1.avif'
import doc2 from './cook2.jpeg'
import doc3 from './cook3.jpg'
import doc4 from './cook4.jpg'
import doc5 from './cook5.jpg'
import doc6 from './cook6.jpg'
import doc7 from './cook7.jpg'
import doc8 from './cook8.jpg'
import doc9 from './cook9.jpeg'
import doc10 from './cook10.jpeg'
import doc11 from './cook11.jpg'
import doc12 from './cook12.jpg'
import doc13 from './cook13.jpeg'
import doc14 from './cook14.avif'
import doc15 from './cook15.avif'
import italian from './italian.jpg'
import french from './french.jpg'
import american from './american.jpg'
import indian from './indian.jpg'
// import Mediterranean from './Neurologist.svg'
import pastry from './pastry.jpg'
import korean from './korean.jpg'


export const assets = {
    banner_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'American Cuisine',
        image: american
    },
    {
        speciality: 'Indian Cuisine',
        image: indian
    },
    {
        speciality: 'Italian Cuisine',
        image: italian
    },
    {
        speciality: 'Pastry & Desserts',
        image: pastry
    },
    
    {
        speciality: 'French Cuisine',
        image: french
    },
    {
        speciality: 'Mediterranean Cuisine',
        image: korean
    },
]

export const cooks = [
    {
        _id: 'cook1',
        name: 'Cook Richard Bennett',
        image: doc1,
        speciality: 'American Cuisine',
        degree: 'CIA Graduate',
        experience: '4 Years',
        about: 'Cook Bennett is renowned for his innovative approach to classic American cuisine, specializing in farm-to-table concepts and sustainable cooking practices. His dedication to sourcing local ingredients and reimagining traditional dishes has established him as a leading figure in contemporary American gastronomy.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        // signatureDish:{
        //     dish1:'testdish1',
        //     dish2:'testdish2',
        //     dish3:'testdish3',
        //     dish4:'testdish4'
        // }

    },
    {
        _id: 'cook2',
        name: 'Cook Emily Chen',
        image: doc2,
        speciality: 'Asian Cuisine',
        degree: 'Le Cordon Bleu',
        experience: '3 Years',
        about: 'Chef Chen brings authentic Asian flavors to life with modern techniques and presentations. Her expertise spans various regional Asian cuisines, with particular focus on fusion dishes that blend traditional methods with contemporary culinary innovations.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook3',
        name: 'Cook Sofia Romano',
        image: doc3,
        speciality: 'Italian Cuisine',
        degree: 'Italian Culinary Institute',
        experience: '1 Years',
        about: 'Chef Romano specializes in traditional Italian cooking with a modern flair. Her authentic approach to pasta-making and regional Italian specialties comes from her family recipes and training under master chefs throughout Italy. She excels in creating seasonal menus that showcase the simplicity and depth of Italian flavors.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook4',
        name: 'Cook Christopher Baker',
        image: doc4,
        speciality: 'Pastry & Desserts',
        degree: 'Pastry Arts Diploma',
        experience: '2 Years',
        about: 'Chef Baker transforms ordinary desserts into extraordinary culinary experiences. His technical precision and artistic presentation make his pastry creations both visually stunning and deliciously unforgettable. He specializes in French patisserie techniques with creative, contemporary interpretations.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook5',
        name: 'Cook Jennifer Stavros',
        image: doc5,
        speciality: 'Mediterranean Cuisine',
        degree: 'Mediterranean Culinary Academy',
        experience: '4 Years',
        about: 'Chef Stavros brings the vibrant flavors of Mediterranean cuisine to every plate. Her focus on olive oils, fresh herbs, and seafood creates healthy, flavorful dishes inspired by Greek, Spanish, and Lebanese traditions. Her cooking philosophy emphasizes simple preparation that highlights the natural quality of ingredients.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook6',
        name: 'Cook Andre Dubois',
        image: doc6,
        speciality: 'Mediterranean Cuisine',
        degree: 'French Culinary Institute',
        experience: '4 Years',
        about: 'Chef Dubois specializes in coastal Mediterranean dishes with French influences. His masterful combination of herbs, spices, and fresh seafood creates memorable dining experiences that transport guests to the Mediterranean coast. He is particularly known for his innovative twists on traditional Mediterranean classics.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook7',
        name: 'Cook Charles Miller',
        image: doc7,
        speciality: 'American Cuisine',
        degree: 'Johnson & Wales University',
        experience: '4 Years',
        about: 'Chef Miller is dedicated to reinventing American comfort food with sophisticated techniques and presentations. His background in Southern cuisine informs his approach to classic American dishes, creating familiar flavors with unexpected twists. He excels at barbecue and smokehouse techniques.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook8',
        name: 'Cook Timothy Nguyen',
        image: doc8,
        speciality: 'Asian Cuisine',
        degree: 'Asian Culinary Academy',
        experience: '3 Years',
        about: 'Chef Nguyen blends traditional Asian cooking techniques with modern European influences. His innovative approach has created signature dishes that showcase the delicate balance of flavors found in Vietnamese, Thai, and Japanese cuisines. He specializes in creating unique dining experiences that tell cultural stories through food.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook9',
        name: 'Cook Ava Rossi',
        image: doc9,
        speciality: 'Italian Cuisine',
        degree: 'Culinary Institute of Milan',
        experience: '1 Years',
        about: 'Chef Rossi brings the authentic tastes of Northern Italy to her kitchen. Her handcrafted pastas, risottos, and slow-cooked ragùs reflect traditional techniques passed down through generations. She is particularly passionate about regional Italian specialties and wine pairings that complement her dishes.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook10',
        name: 'Cook Jeffrey Pierre',
        image: doc10,
        speciality: 'Pastry & Desserts',
        degree: 'French Pastry School',
        experience: '2 Years',
        about: 'Chef Pierre combines artistic vision with technical excellence to create show-stopping desserts and pastries. His background in French techniques provides the foundation for his innovative approach to texture, flavor, and presentation. He is known for his spectacular chocolate work and delicate sugar sculptures.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook11',
        name: 'Cook Zoe Kazan',
        image: doc11,
        speciality: 'Mediterranean Cuisine',
        degree: 'Mediterranean Institute',
        experience: '4 Years',
        about: 'Chef Kazan specializes in the healthy, vibrant flavors of Mediterranean cuisine. Her dishes feature olive oils, fresh vegetables, legumes, and seafood prepared with traditional techniques and modern presentation. She is known for creating balanced menus that celebrate the diverse culinary traditions of the Mediterranean basin.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook12',
        name: 'Cook Patrick Laurent',
        image: doc12,
        speciality: 'French Cuisine',
        degree: 'Le Cordon Bleu Paris',
        experience: '4 Years',
        about: 'Chef Laurent brings classical French culinary traditions to life with impeccable technique and presentation. His training in Michelin-starred restaurants informs his approach to sauces, proteins, and sophisticated flavor profiles. He excels in creating elegant dining experiences that honor French gastronomic heritage.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook13',
        name: 'Cook Chloe Wilson',
        image: doc13,
        speciality: 'American Cuisine',
        degree: 'Culinary Institute of America',
        experience: '4 Years',
        about: 'Chef Wilson celebrates American regional cuisines with an emphasis on fresh, seasonal ingredients. Her farm-to-table approach highlights local producers and sustainable practices. She specializes in elevating classic American comfort foods with modern techniques and sophisticated flavor combinations.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook14',
        name: 'Cook Ryan Tanaka',
        image: doc14,
        speciality: 'Asian Cuisine',
        degree: 'Tokyo Culinary Academy',
        experience: '3 Years',
        about: 'Chef Tanaka specializes in Japanese cuisine with influences from across Asia. His meticulous attention to detail is evident in his knife skills, plating, and flavor balance. He is particularly known for his innovative sushi creations and umami-rich dishes that respect traditional techniques while embracing contemporary presentation.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cook15',
        name: 'Cook Amelia Conti',
        image: doc15,
        speciality: 'Italian Cuisine',
        degree: 'Italian Culinary Academy',
        experience: '1 Years',
        about: 'Chef Conti brings the sunny flavors of Southern Italian cuisine to her kitchen. Her dishes feature bright tomato sauces, seafood, and Mediterranean ingredients prepared with traditional methods and modern flair. She excels at creating convivial dining experiences that capture the warmth and generosity of Italian food culture.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]

export default {cooks , assets};