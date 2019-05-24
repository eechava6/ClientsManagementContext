import java.util.UUID

import scala.concurrent.{ExecutionContext, Future}

import ClientRepository.ClientNotFound

trait ClientRepository {

  def all(): Future[Seq[Client]]

  def save(createClient: CreateClient): Future[Client]

  def update(cc: String, updateClient: UpdateClient): Future[Client]
}

object  ClientRepository {

  final case class  ClientNotFound(id: String) extends Exception("")
}

class InMemoryClientRepository(initialClients: Seq[Client] = Seq.empty)(implicit ec: ExecutionContext) extends ClientRepository {

  private var clients: Vector[Client] = initialClients.toVector

  override def all(): Future[Seq[Client]] = Future.successful(clients)

  override def save(createClient: CreateClient): Future[Client] = Future.successful {
    val client = Client(
      UUID.randomUUID().toString,
      createClient.name,
      createClient.cc,
    )
    clients = clients :+ client
    client
  }

  override def update(cc: String, updateClient: UpdateClient): Future[Client] = {
    clients.find(_.cc == cc) match {
      case Some(foundClient) =>
        val newClient = updateHelper(foundClient, updateClient)
        clients =  clients.map(t => if (t.cc == cc) newClient else t)
        Future.successful(newClient)
      case None =>
        Future.failed(ClientNotFound(cc))
    }
  }

  private def updateHelper(client: Client, updateClient: UpdateClient): Client = {
    val t1 = updateClient.name.map(name => client.copy(name = name)).getOrElse(client)
    updateClient.cc.map(cc => t1.copy(cc = cc)).getOrElse(t1)

  }
}

