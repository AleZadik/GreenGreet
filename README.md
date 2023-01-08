[![MIT License][license-shield]][license-url]


## About The Project

## Live Demo:

```text
https://greengreet.herokuapp.com/
```

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

First clone the GitHub repository with:

* git
  ```sh
  https://github.com/AleZadik/GreenGreet.git
  ```
  
* NFT.storage
  ```text
  Get an API key from https://nft.storage/
  ```
  
* MongoDB (Only for storing address)
  ```text
  Get an API key from https://www.mongodb.com/
  ```

### Installation

_Below is an example of how to install and run the application._

1. Create an `.env` file and add the sample keys located in the `.local.env` file inside a `.env` file.
   ```text
      NFT_STORAGE_KEY=<YOUR_NFT_STORAGE_KEY>
      MONGO_PASS=<YOUR_MONGO_PASS>
   ```
3. Install dependecies
   ```sh
   python3 -m pip install -r requirements.txt
   ```
3. Run Flask Server
   ```sh
   python3 main.py
   ```
4. Open Web Applicaiton
   ```text
   Open your browser and access 127.0.0.1:8080
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


[license-shield]: https://img.shields.io/github/license/AleZadik/xCapeTime?style=for-the-badge
[license-url]: https://github.com/AleZadik/xCapeTime/blob/main/LICENSE
