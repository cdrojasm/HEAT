import typer
import os
import shutil

app = typer.Typer()
BASE_PATH = "./"
APP_PATH = os.path.join(BASE_PATH, "../","app")
API_PATH = os.path.join(BASE_PATH, "../","api")
ENV_ROUTE = os.path.join(BASE_PATH, '.env')
LIST_INSTALLATION_PARAMETERS = [
    {
        "name": "DEPLOYMENT_APP_PORT",
        "description": "PORT to deploy HEAT Application",
        "default": "9020"},
    {
        "name": "DEPLOYMENT_API_PORT",
        "description": "PORT to deploy HEAT API",
        "default": "9021"},
    {
        "name": "DEPLOYMENT_APP_BRANCH",
        "description": "Branch to be cloned to deploy HEAT API",
        "default": "main"},
    {
        "name": "DEPLOYMENT_APP_PROXY_PATH",
        "description": "Proxy path to deploy HEAT API i.e. proxy pass /api to http://localhost:9021/heatApp",
        "default": "/heatApp"},
]


@app.command()
def check_env_file():
    if not os.path.isfile(ENV_ROUTE):
        typer.echo("No .env file found. Please create one.")
        exit(1)
    else:
        typer.echo(".env file found.")


@app.command()
def clean_env_file():
    if os.path.isfile(ENV_ROUTE):
        os.remove(ENV_ROUTE)
        typer.echo("Old .env file removed.")
    else:
        typer.echo("No .env file found.")


@app.command()
def set_env_params():
    if os.path.isfile(ENV_ROUTE):
        typer.echo(".env file found. Do you want to overwrite it? (y/n)")
        overwrite = input()
        if overwrite == "y":
            os.remove(ENV_ROUTE)
            typer.echo("Old .env file removed.")
        else:
            typer.echo("Old .env file kept.")
            exit(1)
    else:
        typer.echo(".env file found.")
    with open(ENV_ROUTE, "a") as f:
        for param in LIST_INSTALLATION_PARAMETERS:
            typer.echo(f"Please enter value for {param['name']}:")
            value = input()

            if value != "":
                value = param['default']
                f.write(f"\n{param['name']}={value}")
                typer.echo(f"{param['name']} set to {value}")
        f.close()
    shutil.copyfile(ENV_ROUTE, os.path.join(APP_PATH, ".env"))
    shutil.copyfile(ENV_ROUTE, os.path.join(API_PATH, ".env"))
    typer.echo("All parameters set.")


@app.command()
def show_env_params():
    if not os.path.isfile('./.env'):
        typer.echo("No .env file found. Please create one.")
        exit(1)
    else:
        with open(ENV_ROUTE, "r") as f:
            for line in f:
                typer.echo(line)
        f.close()


@app.command()
def remove_env_params():
    if not os.path.isfile('./.env'):
        typer.echo("No .env file found. Please create one.")
        exit(1)
    else:
        with open("./.env", "r") as f:
            lines = f.readlines()
            f.close()
        with open(ENV_ROUTE, "w") as f:
            for line in lines:
                typer.echo(f"Remove {line}? (y/n)")
                remove = input()
                if remove == "n":
                    f.write(line)
            f.close()
        typer.echo("All parameters removed.")
        
@app.command()
def deploy_app():
    typer.echo("Deploying HEAT Application...")
    os.system(f"docker-compose up -d --build")
    typer.echo("HEAT Application deployed.")

@app.command()
def restart_app_service():
    typer.echo("Restarting HEAT Application...")
    os.system(f"docker-compose restart app")
    typer.echo("HEAT Application restarted.")


if __name__ == "__main__":
    app()
