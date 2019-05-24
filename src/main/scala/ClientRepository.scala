import java.util.UUID

import scala.concurrent.{ExecutionContext, Future}

import ClientRepository.ClientNotFound

trait ClientRepository {

  def all(): Future[Seq[Client]]

  def save(createClient: CreateClient): Future[Client]
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

}
