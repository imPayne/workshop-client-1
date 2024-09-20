<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js.js";
import {useNewsStore} from "@/stores/newsStore.js";
import router from "@/router/index.js";

const baseUrl = 'http://localhost:3000';

const books = ref([]);

const userStore = useUserStore();
const newsStore = useNewsStore();

const redirectDetail = ref(false);

function redirectionDetail(id) {
  router.push(`/books/details/${id}`);
}

const booksList = [
  {
    id: "g3HNAAAAMAAJ",
    title: "La Revue d'art dramatique et musical",
    coverImage: "http://books.google.com/books/content?id=g3HNAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1892",
    publisher: "Éditeur inconnu",
    author: "Edmond Stoullig",
    genre: "Drame",
    summary: "Pas de description disponible."
  },
  {
    id: "fCFoAAAAcAAJ",
    title: "La fille de Roland",
    coverImage: "http://books.google.com/books/content?id=fCFoAAAAcAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1875",
    publisher: "Éditeur inconnu",
    author: "Henri de Bornier",
    genre: "Drame",
    summary: "Élément no. 305 dans Deux siècles de drame français, 1760-1960, une collection de 2 014 pièces françaises conservée dans les collections spéciales de l'Université de Floride."
  },
  {
    id: "jzg3AQAAMAAJ",
    title: "Impressions de théatre...",
    coverImage: "http://books.google.com/books/content?id=jzg3AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1894",
    publisher: "Éditeur inconnu",
    author: "Jules Lemaître",
    genre: "Drame",
    summary: "Pas de description disponible."
  },
  {
    id: "t3AGAAAAQAAJ",
    title: "La fille de Roland",
    coverImage: "http://books.google.com/books/content?id=t3AGAAAAQAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1876",
    publisher: "Éditeur inconnu",
    author: "Henri de Bornier",
    genre: "Drame",
    summary: "Élément no. 305 dans Deux siècles de drame français, 1760-1960, une collection de 2 014 pièces françaises conservée dans les collections spéciales de l'Université de Floride."
  },
  {
    id: "NvhmzgEACAAJ",
    title: "E. H., comédie-vaudeville en un acte",
    coverImage: "http://books.google.com/books/content?id=NvhmzgEACAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2019-11-25",
    publisher: "Éditeur inconnu",
    author: "Moreau-E",
    genre: "Inconnu",
    summary: "Pas de description disponible."
  },
  {
    id: "wNhAEAAAQBAJ",
    title: "ROSE e SPINE (brani scelti)",
    coverImage: "http://books.google.com/books/content?id=wNhAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2021-09-02",
    publisher: "Youcanprint",
    author: "Alberto Di Segni",
    genre: "Drame",
    summary: "Rose et épines représentent, comme tant d'autres, une métaphore de la vie. L'auteur a sélectionné, sur une douzaine d'années, plus de 1 200 extraits de plus de 360 œuvres de fiction, d'essais et de spiritualité."
  },
  {
    id: "qG5CEAAAQBAJ",
    title: "Étude physiologique sur l'action des poisons",
    coverImage: "http://books.google.com/books/content?id=qG5CEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2021-09-06",
    publisher: "Good Press",
    author: "Louis Félix Henneguy",
    genre: "Fiction",
    summary: "\"Étude physiologique sur l'action des poisons\", de Louis Félix Henneguy. Publié par Good Press. Good Press publie un large éventail d'ouvrages, où sont inclus tous les genres littéraires. ..."
  },
  {
    id: "0TU7DwAAQBAJ",
    title: "One Piece - Édition originale - Tome 66",
    coverImage: "http://books.google.com/books/content?id=0TU7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2017-11-29",
    publisher: "Glénat Manga",
    author: "Eiichiro Oda",
    genre: "Bandes dessinées et romans graphiques",
    summary: "L’île des hommes-poissons a décidé de tirer un trait sur ses vieilles rancœurs afin de nouer des liens avec les humains ! Cependant, ce jour de la réconciliation pourrait ne jamais arriver, car toute l’île est menacée de destruction par Noah ! L’équipage hissera ensuite les voiles vers le Nouveau Monde, où de vieilles connaissances guettent déjà leur arrivée..."
  },
  {
    id: "E8Fu-FcI318C",
    title: "Le jugement en action",
    coverImage: "http://books.google.com/books/content?id=E8Fu-FcI318C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2006",
    publisher: "Librairie Droz",
    author: "Baudouin Dupret",
    genre: "Justice",
    summary: "Pas de description disponible."
  },
  {
    id: "lFgnDwAAQBAJ",
    title: "Éthique, travail social et action communautaire",
    coverImage: "http://books.google.com/books/content?id=lFgnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2014-08-26T00:00:00-04:00",
    publisher: "PUQ",
    author: "Henri Lamoureux",
    genre: "Philosophie",
    summary: "Les praticiens du travail social accompagnent et soutiennent des personnes et des groupes confrontés à une gamme de difficultés et de problèmes dont les causes sont à la fois personnelles et sociales ..."
  },
  {
    id: "dyJvEAAAQBAJ",
    title: "Concevoir des plateformes de services",
    coverImage: "http://books.google.com/books/content?id=dyJvEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2022-05-18",
    publisher: "Dunod",
    author: "Jean-René Loubat, Jean-Pierre Hardy, Marie-Aline Bloch",
    genre: "Sciences sociales",
    summary: "Les plates-formes de services représentent ce nouveau type d’organisation, mutualisant leurs moyens, optimisant les ressources et l’accès aux compétences ..."
  },
  {
    id: "zeD7DwAAQBAJ",
    title: "Dune - Tome 1",
    coverImage: "http://books.google.com/books/content?id=zeD7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Traduction revue et corrigée. Il n'y a pas, dans tout l'Empire, de planète plus inhospitalière que Dune. Partout des sables à perte de vue..."
  },
  {
    id: "1eD7DwAAQBAJ",
    title: "Dune - Tome : Le Messie de Dune",
    coverImage: "http://books.google.com/books/content?id=1eD7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Paul Atréides a triomphé de ses ennemis. En douze ans de guerre sainte, ses Fremen ont conquis l'univers..."
  },
  {
    id: "3SEAEAAAQBAJ",
    title: "Dune",
    coverImage: "http://books.google.com/books/content?id=3SEAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-10-07",
    publisher: "Dunod",
    author: "Nicolas Allard",
    genre: "Photographie",
    summary: "En 2020, Dune reste le roman de science-fiction le plus lu au monde. Plus de 50 ans après sa première publication, le texte de Frank Herbert continue de fasciner. Nicolas Allard analyse les grands thèmes de Dune..."
  },
  {
    id: "BN_7DwAAQBAJ",
    title: "Dune - Tome 3 : Les Enfants de Dune",
    coverImage: "http://books.google.com/books/content?id=BN_7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Sur Dune, les prophéties s'accomplissent, le désert devient jardin, mais l'épice vient à manquer..."
  },
  {
    id: "TYmMF0-Dof4C",
    title: "Lettres persanes",
    coverImage: "http://books.google.com/books/content?id=TYmMF0-Dof4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1777",
    publisher: "Éditeur inconnu",
    author: "Montesquieu",
    genre: "Roman épistolaire, Satire",
    summary: "Les Lettres persanes est un roman épistolaire publié en 1721 par Montesquieu. Le livre raconte l'histoire de deux nobles persans, Usbek et Rica, qui voyagent en Europe, principalement à Paris, et échangent des lettres décrivant leurs impressions sur la société européenne. Par leurs observations critiques, Montesquieu propose une satire mordante des mœurs, de la religion, et des institutions françaises de l'époque, en abordant des sujets comme l'absolutisme, le fanatisme religieux, et la liberté de pensée. Le roman reste une œuvre phare de la philosophie des Lumières."
  },
  {
    id: "xZriEAAAQBAJ",
    title: "Hunger Games - Intégrale",
    coverImage: "http://books.google.com/books/content?id=xZriEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2023-11-16",
    publisher: "Pocket Jeunesse",
    author: "Suzanne Collins",
    genre: "Fiction pour jeunes adultes",
    summary: "L'intégrale des 3 titres Hunger Games en exclusivité numérique. Un jeu imposé, 24 candidats, seul le gagnant survivra. Aux vainqueurs, la gloire et la fortune. Aux perdants, une mort certaine. Que les Hunger Games commencent. Dans chaque district de Panem, une société reconstruite sur les ruines des États-Unis, deux adolescents sont choisis pour participer aux Hunger Games. La règle est simple : tuer ou se faire tuer. Katniss et Peeta, élus du district 12, sont catapultés dans un jeu violent où la nourriture est rationnée et où les alliances se font et se défont. Peeta déclare sa flamme à Katniss devant les caméras, mais tout est faussé dans ce jeu de survie où seule la ruse compte. Cet ebook contient les 3 romans suivants : Hunger Games tome 1, L'embrasement (tome 2), et La révolte (tome 3)."
  },
  {
    id: "nvijsUyJYR4C",
    title: "Harry Potter à L'école des Sorciers",
    coverImage: "http://books.google.com/books/content?id=nvijsUyJYR4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l’emmener à Poudlard, une école de sorcellerie! Voler en balai, jeter des sorts, combattre les trolls : Harry Potter se révèle un sorcier doué..."
  },
  {
    id: "d1Fm_U1LzY4C",
    title: "Harry Potter et l’Ordre du Phénix",
    coverImage: "http://books.google.com/books/content?id=d1Fm_U1LzY4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "À quinze ans, Harry entre en cinquième année à Poudlard, mais il n’a jamais été si anxieux. L’adolescence, les examens et les cauchemars le perturbent... Le ministère de la Magie refuse de croire au retour de Voldemort, mais Dumbledore et Harry s'organisent..."
  },
  {
    id: "ox9BiuVKM1cC",
    title: "Harry Potter et la Coupe de Feu",
    coverImage: "http://books.google.com/books/content?id=ox9BiuVKM1cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "Harry Potter a quatorze ans et entame sa quatrième année à Poudlard. Un tournoi de magie exceptionnel réunit des écoles du monde entier, mais les événements prennent rapidement une tournure dramatique. Harry devra affronter ses plus grandes épreuves dans ce quatrième tome palpitant."
  }
];const topRatedBooks = [
  {
    id: "g3HNAAAAMAAJ",
    title: "La Revue d'art dramatique et musical",
    coverImage: "http://books.google.com/books/content?id=g3HNAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1892",
    publisher: "Éditeur inconnu",
    author: "Edmond Stoullig",
    genre: "Drame",
    summary: "Pas de description disponible."
  },
  {
    id: "fCFoAAAAcAAJ",
    title: "La fille de Roland",
    coverImage: "http://books.google.com/books/content?id=fCFoAAAAcAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1875",
    publisher: "Éditeur inconnu",
    author: "Henri de Bornier",
    genre: "Drame",
    summary: "Élément no. 305 dans Deux siècles de drame français, 1760-1960, une collection de 2 014 pièces françaises conservée dans les collections spéciales de l'Université de Floride."
  },
  {
    id: "jzg3AQAAMAAJ",
    title: "Impressions de théatre...",
    coverImage: "http://books.google.com/books/content?id=jzg3AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1894",
    publisher: "Éditeur inconnu",
    author: "Jules Lemaître",
    genre: "Drame",
    summary: "Pas de description disponible."
  },
  {
    id: "t3AGAAAAQAAJ",
    title: "La fille de Roland",
    coverImage: "http://books.google.com/books/content?id=t3AGAAAAQAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1876",
    publisher: "Éditeur inconnu",
    author: "Henri de Bornier",
    genre: "Drame",
    summary: "Élément no. 305 dans Deux siècles de drame français, 1760-1960, une collection de 2 014 pièces françaises conservée dans les collections spéciales de l'Université de Floride."
  },
  {
    id: "NvhmzgEACAAJ",
    title: "E. H., comédie-vaudeville en un acte",
    coverImage: "http://books.google.com/books/content?id=NvhmzgEACAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2019-11-25",
    publisher: "Éditeur inconnu",
    author: "Moreau-E",
    genre: "Inconnu",
    summary: "Pas de description disponible."
  },
  {
    id: "wNhAEAAAQBAJ",
    title: "ROSE e SPINE (brani scelti)",
    coverImage: "http://books.google.com/books/content?id=wNhAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2021-09-02",
    publisher: "Youcanprint",
    author: "Alberto Di Segni",
    genre: "Drame",
    summary: "Rose et épines représentent, comme tant d'autres, une métaphore de la vie. L'auteur a sélectionné, sur une douzaine d'années, plus de 1 200 extraits de plus de 360 œuvres de fiction, d'essais et de spiritualité."
  },
  {
    id: "qG5CEAAAQBAJ",
    title: "Étude physiologique sur l'action des poisons",
    coverImage: "http://books.google.com/books/content?id=qG5CEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2021-09-06",
    publisher: "Good Press",
    author: "Louis Félix Henneguy",
    genre: "Fiction",
    summary: "\"Étude physiologique sur l'action des poisons\", de Louis Félix Henneguy. Publié par Good Press. Good Press publie un large éventail d'ouvrages, où sont inclus tous les genres littéraires. ..."
  },
  {
    id: "Ukr8EAAAQBAJ",
    title: "Plan d’action conjoint «Une seule santé»",
    coverImage: "http://books.google.com/books/content?id=Ukr8EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2024-01-08",
    publisher: "Food & Agriculture Org.",
    author: "Food and Agriculture Organization of the United Nations, United Nations Environment Programme, World Health Organization, World Organisation for Animal Health",
    genre: "Médical",
    summary: "Les organisations membres de la Quadripartite collaborent en vue d’apporter les changements et transformations nécessaires pour atténuer les effets des défis actuels et futurs à l’interface entre les êtres humains, les animaux, les végétaux et l’environnement ..."
  },
  {
    id: "E8Fu-FcI318C",
    title: "Le jugement en action",
    coverImage: "http://books.google.com/books/content?id=E8Fu-FcI318C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2006",
    publisher: "Librairie Droz",
    author: "Baudouin Dupret",
    genre: "Justice",
    summary: "Pas de description disponible."
  },
  {
    id: "lFgnDwAAQBAJ",
    title: "Éthique, travail social et action communautaire",
    coverImage: "http://books.google.com/books/content?id=lFgnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2014-08-26T00:00:00-04:00",
    publisher: "PUQ",
    author: "Henri Lamoureux",
    genre: "Philosophie",
    summary: "Les praticiens du travail social accompagnent et soutiennent des personnes et des groupes confrontés à une gamme de difficultés et de problèmes dont les causes sont à la fois personnelles et sociales ..."
  },
  {
    id: "dyJvEAAAQBAJ",
    title: "Concevoir des plateformes de services",
    coverImage: "http://books.google.com/books/content?id=dyJvEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2022-05-18",
    publisher: "Dunod",
    author: "Jean-René Loubat, Jean-Pierre Hardy, Marie-Aline Bloch",
    genre: "Sciences sociales",
    summary: "Les plates-formes de services représentent ce nouveau type d’organisation, mutualisant leurs moyens, optimisant les ressources et l’accès aux compétences ..."
  },
  {
    id: "zeD7DwAAQBAJ",
    title: "Dune - Tome 1",
    coverImage: "http://books.google.com/books/content?id=zeD7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Traduction revue et corrigée. Il n'y a pas, dans tout l'Empire, de planète plus inhospitalière que Dune. Partout des sables à perte de vue..."
  },
  {
    id: "1eD7DwAAQBAJ",
    title: "Dune - Tome : Le Messie de Dune",
    coverImage: "http://books.google.com/books/content?id=1eD7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Paul Atréides a triomphé de ses ennemis. En douze ans de guerre sainte, ses Fremen ont conquis l'univers..."
  },
  {
    id: "2N4bzgEACAAJ",
    title: "Dune, le mook",
    coverImage: "Pas d'image disponible",
    publicationDate: "2020-11-19",
    publisher: "Companyédition Atalante/Leha Editions",
    author: "Lloyd Chery",
    genre: "Inconnu",
    summary: "Pas de description disponible."
  },
  {
    id: "3SEAEAAAQBAJ",
    title: "Dune",
    coverImage: "http://books.google.com/books/content?id=3SEAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-10-07",
    publisher: "Dunod",
    author: "Nicolas Allard",
    genre: "Photographie",
    summary: "En 2020, Dune reste le roman de science-fiction le plus lu au monde. Plus de 50 ans après sa première publication, le texte de Frank Herbert continue de fasciner. Nicolas Allard analyse les grands thèmes de Dune..."
  },
  {
    id: "BN_7DwAAQBAJ",
    title: "Dune - Tome 3 : Les Enfants de Dune",
    coverImage: "http://books.google.com/books/content?id=BN_7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2020-09-24",
    publisher: "Robert Laffont",
    author: "Frank Herbert",
    genre: "Fiction",
    summary: "Le chef-d'œuvre absolu de la science-fiction, adapté au cinéma par Denis Villeneuve. Sur Dune, les prophéties s'accomplissent, le désert devient jardin, mais l'épice vient à manquer..."
  },
  {
    id: "TYmMF0-Dof4C",
    title: "Lettres persanes",
    coverImage: "http://books.google.com/books/content?id=TYmMF0-Dof4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "1777",
    publisher: "Éditeur inconnu",
    author: "Montesquieu",
    genre: "Roman épistolaire, Satire",
    summary: "Les Lettres persanes est un roman épistolaire publié en 1721 par Montesquieu. Le livre raconte l'histoire de deux nobles persans, Usbek et Rica, qui voyagent en Europe, principalement à Paris, et échangent des lettres décrivant leurs impressions sur la société européenne. Par leurs observations critiques, Montesquieu propose une satire mordante des mœurs, de la religion, et des institutions françaises de l'époque, en abordant des sujets comme l'absolutisme, le fanatisme religieux, et la liberté de pensée. Le roman reste une œuvre phare de la philosophie des Lumières."
  },
  {
    id: "xZriEAAAQBAJ",
    title: "Hunger Games - Intégrale",
    coverImage: "http://books.google.com/books/content?id=xZriEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2023-11-16",
    publisher: "Pocket Jeunesse",
    author: "Suzanne Collins",
    genre: "Fiction pour jeunes adultes",
    summary: "L'intégrale des 3 titres Hunger Games en exclusivité numérique. Un jeu imposé, 24 candidats, seul le gagnant survivra. Aux vainqueurs, la gloire et la fortune. Aux perdants, une mort certaine. Que les Hunger Games commencent. Dans chaque district de Panem, une société reconstruite sur les ruines des États-Unis, deux adolescents sont choisis pour participer aux Hunger Games. La règle est simple : tuer ou se faire tuer. Katniss et Peeta, élus du district 12, sont catapultés dans un jeu violent où la nourriture est rationnée et où les alliances se font et se défont. Peeta déclare sa flamme à Katniss devant les caméras, mais tout est faussé dans ce jeu de survie où seule la ruse compte. Cet ebook contient les 3 romans suivants : Hunger Games tome 1, L'embrasement (tome 2), et La révolte (tome 3)."
  },
  {
    id: "nvijsUyJYR4C",
    title: "Harry Potter à L'école des Sorciers",
    coverImage: "http://books.google.com/books/content?id=nvijsUyJYR4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l’emmener à Poudlard, une école de sorcellerie! Voler en balai, jeter des sorts, combattre les trolls : Harry Potter se révèle un sorcier doué..."
  },
  {
    id: "d1Fm_U1LzY4C",
    title: "Harry Potter et l’Ordre du Phénix",
    coverImage: "http://books.google.com/books/content?id=d1Fm_U1LzY4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "À quinze ans, Harry entre en cinquième année à Poudlard, mais il n’a jamais été si anxieux. L’adolescence, les examens et les cauchemars le perturbent... Le ministère de la Magie refuse de croire au retour de Voldemort, mais Dumbledore et Harry s'organisent..."
  },
  {
    id: "ox9BiuVKM1cC",
    title: "Harry Potter et la Coupe de Feu",
    coverImage: "http://books.google.com/books/content?id=ox9BiuVKM1cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    publicationDate: "2015-12-08",
    publisher: "Pottermore Publishing",
    author: "J.K. Rowling",
    genre: "Fiction pour jeunes",
    summary: "Harry Potter a quatorze ans et entame sa quatrième année à Poudlard. Un tournoi de magie exceptionnel réunit des écoles du monde entier, mais les événements prennent rapidement une tournure dramatique. Harry devra affronter ses plus grandes épreuves dans ce quatrième tome palpitant."
  }
];

onMounted(async () => {
   books.value = booksList;
   console.log(books.value);
});
</script>

<template>
  <div class="max-w-4xl mx-auto mt-10 space-y-10">
    <div v-if="userStore.user && !userStore.user.admin" class="max-w-4xl mx-auto mt-10 space-y-10">
      <section class="my-5">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div v-for="book in books" :key="book.title" class="flex flex-col items-center p-4 bg-gray-100 rounded-md">
            <div class="max-w-32 h-auto" @click="redirectionDetail(book.id)">
              <img :src="book.coverImage" alt="da">
              <div class="text-lg font-semibold">{{ book.title }}</div>
              <div class="text-sm text-gray-500">Auteur: {{ book.author }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
</style>