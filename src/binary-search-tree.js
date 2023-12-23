const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    this.rootNode ? this.addNode(this.rootNode, newNode) : this.rootNode = newNode;
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      node.left ? this.addNode(node.left, newNode) : node.left = newNode;
    } else {
      node.right ? this.addNode(node.right, newNode) : node.right = newNode;
    }
  }

  has(data) {
    return this.search(this.rootNode, data);
  }

  search(node, data) {
    if (!node) {
      return false;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return true;
    }
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  findNode(node, data) {
    if (!node) {
      return null;
    } else if (data < node.data) {
      return this.findNode(node.left, data);
    } else if (data > node.data) {
      return this.findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }
      const newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  min() {
    return this.minNode(this.rootNode)?.data || null;
  }

  minNode(node) {
    if (!node) {
      return null;
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  max() {
    return this.maxNode(this.rootNode)?.data || null;
  }

  maxNode(node) {
    if (!node) {
      return null;
    }
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};