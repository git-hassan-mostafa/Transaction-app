## Steps to Add a new Page.

- Run in the command : npm run gc /Pages/PageName (This will create a folder under Pages folder and create a "PageName.tsx" file under /app folder).

- In the pages list in C:\Users\Pc\Desktop\Transaction-app\Global\Constants\Pages.ts add new page to the list with all its data.

- And now you have a new page.

## Steps to create a new service (BLL, DAL)

- Add a Data Access Class in "DAL" Folder.

- Add a Business Logic class in "BLL" Folder.

- Create a new method in DALFactory.ts file to create the DAL service.

- Create a new method in BLLFactory.ts file to create the BLL service.

- call the BLL method inside the Service Provider context to create the Manager once.

- DAL services should only be called from BLL classes.

- BLL classes should only be accessed inside Service Provider.

- User the service like this "const {manager} = useService();

## To Avoid:

# It is totally prohibited to:

- Use services on the same layer as a dependency of each others.

- Use ViewModels inside DAL services.

- Use DB Models inside components or pages hooks.
