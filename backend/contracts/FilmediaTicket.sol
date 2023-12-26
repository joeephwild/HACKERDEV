// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title Filmedia Ticket Contract
 * @dev This contract represents a ticket in the Filmedia platform.
 * Each ticket is an NFT (Non-Fungible Token) that can be owned by a user.
 * The contract includes functions for minting new tickets, transferring ownership, and other ticket-related operations.
 */

// Importing necessary OpenZeppelin contracts for creating ERC721 tokens
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// FilmediaTicket contract definition
contract FilmediaTicket is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable {

    // Struct for Ticket data
    struct Ticket {
        uint256 duration; // Duration of the ticket validity
        uint256 ticketAmount; // Amount of tickets
        uint256 noOfTicketSold; // Number of tickets sold
        uint256 noOfTicket;
        string tokenUri; // URI for the token metadata
    }

    // Variable for tracking the next token ID
    uint256 private _nextTokenId;

    //array of ticket
    Ticket[] public tickets;

    // Constructor for the contract
    constructor()
        ERC721("FilTicket", "FTK") // Setting the name and symbol of the token
    {}

    // Function to create a new token ticket
    // @params
    function createANewTicket(string memory _uri, uint256 _duration, uint256 amount, uint256 _amountOfTicket) external {
        // require(_duration > block.timestamp, "Duration need to in after");

        // Mint a new token
    safeMint(msg.sender, _uri);
    
    // Create a new ticket
    Ticket memory newTicket = Ticket({
        duration: _duration,
        ticketAmount: amount,
        noOfTicketSold: 0,
        noOfTicket: _amountOfTicket,
        tokenUri: _uri
    });

    
    
    // Add the new ticket to the tickets array
    tickets.push(newTicket);
    }

  // retrieve every single token uri in the tickets array
    function getAllTokenURIs() public view returns (string[] memory) {
    uint256 totalTokens = totalSupply();
    string[] memory tokenURIs = new string[](totalTokens);

    for (uint256 i = 0; i < totalTokens; i++) {
        tokenURIs[i] = tokenURI(i);
    }

    return tokenURIs;
}

// Function to purchase a ticket
function purchaseTicket(uint256 ticketId, uint256 paymentAmount) external payable {
    require(tickets[ticketId].noOfTicket > 0, "Ticket is not available for sale");
    require(paymentAmount >= ticketPrice, "Insufficient payment");

    // Transfer the ownership of the ticket to the buyer
    safeTransferFrom(ownerOf(ticketId), msg.sender, ticketId);

    // increase the number of tickets sold
    tickets[ticketId].noOfTicketSold++;
    tickets[ticketId].noOfTicket--;
}

    // Function to safely mint new tokens
    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId); // Minting the token
        _setTokenURI(tokenId, uri); // Setting the token URI
    }

    // Overridden function from ERC721 for updating token ownership
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    // Overridden function from ERC721 for increasing account balance
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    // Overridden function from ERC721 for getting token URI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Overridden function from ERC721 for checking supported interfaces
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}