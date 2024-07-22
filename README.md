# Créer son portfolio avec React

## Étape 1

On créé un projet vite avec React + TypeScript

`pnpm create vite` 

Pour lancer le projet sur votre machine, il suffit de lancer la commande 
`pnpm install` pour installer les dépendances et `pnpm run dev` pour lancer le projet sur votre machine après l'avoir colé depuis GitHub

## Étape 2

On initialise le tracking git

`git init`, puis `git add .` et `git commit -m "Initial commit"`

Sur VSCode, on peut directement pusher le projet sur GitHub. Rappel, sur VSCode vous pouvez utiliser l'interface "Source control" (Contrôle de source) pour gérer vos commits sans passer par le terminal.

## Étape 3

On install TailwindCSS pour produire un CSS généré par Tailwind qui va nous faire gagner du temps sur la partie Front-end et responsive, voir la documentation :

https://tailwindcss.com/docs/

`npm install -D tailwindcss`

puis

`npx tailwindcss init` et ajouter les extension `.jsx` `.ts` et `.tsx` dans le fichier `tailwind.config.js`

Créer un fichier `src/input.css` et ajouter le code suivant :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensuite, ajouter une commande à `package.json` pour générer et mettre en place la compilation automatique en live :

```json
"scripts": {
  "tailwind": "npx tailwindcss -i ./src/input.css -o ./src/styles.css --watch"
}
```

```
npm run tailwind
```

## Étape 4

Mettre en place les librairies et packages nécessaires :


### React Router DOM

`react-router-dom` est taillé pour la navigation dans un interface React. Il permet de gérer les routes et les redirections.

Mise en place minimal :

```bash
pnpm install react-router-dom

```

On se rend dans le fichier `main.tsx`et on y ajoute les éléments suivants :

L'importation de `createBrowserRouter` et `RouterProvider` :

```tsx
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
```

Création du routeur. Rappel, le routeur est un système qui a pour objectif la gestion des accès à une application au travers des URLs.

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "categories/:category",
    element: <CategoryPage />,
  },
  {
    path: "/recettes",
    element: <Recettes />,
  },
  {
    path: "/recette/:id",
    element: <RecipeDetails />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/contribuer",
    element: <FormRecette />,
  },
  {
    path: "/favoris",
    element: <Fav />,
  }
]);
```

Il faut ensuite mettre à disposition le routeur dans l'application avec la classe RouterProvider. Notez que le composant prend une prop `router` qui est le routeur lui-même :

```tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
```

Suite à cela, nous pouvons créer et ajouter des liens avec le composant `NavLink` ou `Link` :

```tsx
<NavLink to="/">favoris</NavLink>
```


## Étape 5

Organisation du projet : 

src/
  components/
    [text](src/components/CategoryWrapper.tsx) = Wrapper avec les boutons de catégories
    [text](src/components/CompanyLogo.tsx) = Logo des sociétés partenaires
    [text](src/components/DesktopNav.tsx) = NavBar Mobile
    [text](src/components/FeaturedSection.tsx) = Section Featured(mise en avant sur la page d'accueil)
    [text](src/components/Footer.tsx) = Composant Footer
    [text](src/components/Header.tsx) = Composant Header
    [text](src/components/Hero.tsx) = Section Hero (barre de recherche + titre)
    [text](src/components/MobileNav.tsx) = NavBar Mobile
    [text](src/components/NewsLetter.tsx) = Composant NewsLetter
    [text](src/components/RecipeCard.tsx) = Composant RecipeCard qui sert à afficher les Cards de la page Recettes
    [text](src/components/RecipeCardCategory.tsx) = Composant RecipeCardCategory qui sert à afficher les Cards de la page Recettes
  pages/
    [text](src/pages/Articles.tsx) = Page Articles regroupant des articles de Blog
    [text](src/pages/CategoryPage.tsx) = Page de catégories (filtrage par boutons de catégories)
    [text](src/pages/ErrorPage.tsx) = Page d'erreur 404 (page non trouvée)
    [text](src/pages/Fav.tsx) = Page Favoris (retrouver vos recettes favoris ici)
    [text](src/pages/Home.tsx) = Page d'accueil
    [text](src/pages/FormRecette.tsx) = Page formulaire de Recette (ajouter une recette)
    [text](src/pages/Recettes.tsx) = Page Recettes (liste des recettes)
    [text](src/pages/RecipeDetails.tsx) = Page détaillée d'une recette (affichage d'une recette)
    [text](src/pages/Search.tsx) = Page de recherche (page de redirection pour une recherche par mots clés)
  main.tsx = fichier principal (RouterProvider)
  input.css = fichier CSS pour générer les classes Tailwind
  styles.css = fichier CSS généré par tailwind


  ## Étape 6 - Mise en place des fonctionnalités

  
### Search Bar

#### Hero.tsx

Redirection vers la page serach avec la propriété `query` qui est le paramètre de la recherche (ex : `?query=chocolat`).

```
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/search?query=' + event.currentTarget.query.value);

  };
```

#### Search.tsx

On ajoute une page `Search` qui va permettre de faire une recherche par mots clés et d'afficher les résultats.

```
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Recipe[]>([]); // Utilisation de l'interface Recipe
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get("query");
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [location.search]);
```	

On ajoute une fonction `fetchItems` qui va récupérer les recettes et les afficher dans la liste.

```
    const fetchItems = async () => {
        if (query.trim() === "") return;
        setLoading(true);
        try {
            const response = await fetch(`https://recettes-api.vercel.app/recettes`);
            const data: Recipe[] = await response.json(); // Utilisation de l'interface Recipe
            // Filtrage des résultats
            const filteredData = data.filter((item: Recipe) => // Utilisation de l'interface Recipe
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredData);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Une erreur est survenue lors de la recherche");
            }  
        } finally {
            setLoading(false);
        }
    };
```

On utilise la méthode `onChange` pour mettre à jour le paramètre de la recherche lorsque l'utilisateur tape dans la barre de recherche.

```
    <input
                        className="outline-none w-full placeholder:text-[#1b2629]"
                        name="query"
                        type="search"
                        placeholder="Cherche une recette"
                        id="search"
                        required
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
```

### Affichage des recettes

#### Recettes.tsx

On ajoute une page `Recettes` qui va afficher les recettes. On utilise la méthode `useEffect` pour récupérer les recettes depuis l'API.

```
const [listRecettes, setListRecettes] = useState([]);
    const [error, setError] = useState("");

    const fetchRecettes = async () => {
        const url = 'https://recettes-api.vercel.app/recettes';
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "False") {
                setListRecettes([]);
            } else {
                setListRecettes(data);
            }
            console.log("Data fetched: ", data);
        } catch (error) {
            setError("Une erreur est survenue lors de la récupération des recettes");
        }
    };

    useEffect(() => {
        fetchRecettes();
    }, []);
    ```

  Puis on utilise les props `listRecettes` et la méthode `map` pour afficher les recettes en utilisant la composant `RecipeCardCategory`.

  ```
  <ul className="grid grid-cols-2 gap-8 mt-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listRecettes && listRecettes.map((item: Recipe) => (
            <RecipeCardCategory item={item} key={item.id} />
        ))}
    </ul>
  ```

#### RecipeCardCategory.tsx

On ajoute une composant `RecipeCardCategory` qui va afficher les recettes. On utilise une interface `Recipe` pour définir les propriétés de la recette et le typage des données attendues.

```
interface Recipe {
    id: string;
    name: string;
    img: string;
    tempsprépa: string;
    difficulté: string;
    type: string;
    région: string;
    ingrédients: [{ nom: string, quantité: string }];
    instructions: string;
    portions: string;
    conseils: string;
}

interface RecipeProps {
    item: Recipe;
}

const RecipeCardCategory = ({ item }: RecipeProps) => {}
```

Chaque recette contient un `NavLink` qui redirige vers la page de détails de la recette. Cette fois ci on utilise la méthode `useParams` pour récupérer l'ID de la recette depuis l'URL et la méthode `useCallback` pour récupérer la recette depuis l'API.

```
const RecipeDetails = () => {
    const { id } = useParams();
    const [recette, setRecette] = useState<Recipe[]>([]);

    const getOneRecippe = useCallback(async () => {
        try {
            const response = await fetch(`https://recettes-api.vercel.app/recettes`);
            const data = await response.json();
            const filteredData = data.filter((item: Recipe) => item.id == id);
            setRecette(filteredData);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        getOneRecippe();
    }, [getOneRecippe]);}
  ```

#### Ajout de Recettes

### Form Recette  

On ajoute une page `FormRecette` qui va permettre d'ajouter une recette.
 Formulaire permettant d’ajouter une nouvelle recette avec des champs pour chaque élément
de la base de données. Le but est de pouvoir ajouter une recette sans avoir à se
soucier du format des données.

 Validation des champs pour s'assurer que toutes les informations nécessaires
sont fournies. La vérification des champs se fera pendant le remplissage de
l’utilisateur.


#### Favoris

### Ajout et suppression de recettes favoris

Dans chaque Card de la liste des recettes, il y a un bouton pour ajouter ou supprimer la recette de la liste des recettes favoris.

```
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the item is already in localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(storedFavorites.some((fav: Recipe) => fav.id === item.id));
    }, [item.id]);

    const handleFavoriteClick = () => {
        let storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (isFavorite) {
            // Remove from favorites
            storedFavorites = storedFavorites.filter((fav: Recipe) => fav.id !== item.id);
        } else {
            // Add to favorites
            storedFavorites.push(item);
        }

        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        setIsFavorite(!isFavorite);
    };
```

### Affichage des recettes favoris

On ajoute une page `Fav` qui va afficher les recettes favoris.

```
interface Recipe {
    id: string,
    name: string,
    img: string,
    tempsprépa: string,
    difficulté: string,
    type: string,
    région: string,
    ingrédients: [{ nom: string, quantité: string }],
    instructions: string,
    portions: string,
    conseils: string,
}

const Fav = () => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        // Retrieve favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);}
```
On récupère les données depuis le local Storage et on affiche les recettes favoris en utilisant le component Card. 